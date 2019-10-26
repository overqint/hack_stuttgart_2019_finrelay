import { Injectable } from '@nestjs/common';
import {
  WorkflowExecute,
  createDeferredPromise,
  IDeferredPromise,
} from 'n8n-core';
import {
  IWorkflowExecuteAdditionalData,
  Workflow,
  IRun,
  ITaskData,
  IWorkflowCredentials,
  ICredentialDataDecryptedObject,
  ICredentialsDecrypted,
  ICredentialsEncrypted,
} from 'n8n-workflow';
import { NodeTypes } from './node-types.const';

@Injectable()
export class N8NWrapperService {
  public async runWorkflow(workflowData: any) {
    if (!workflowData) throw new Error('Invalid argument: workflowData');
    const workflowInstance = new Workflow(
      'test',
      workflowData.nodes,
      workflowData.connections,
      false,
      NodeTypes(),
    );

    function WorkflowExecuteAdditionalData(
      waitPromise: IDeferredPromise<IRun>,
      nodeExecutionOrder: string[],
    ): IWorkflowExecuteAdditionalData {
      const mailDefaultCred: ICredentialsEncrypted = {
        name: 'mail-default',
        type: 'smtp',
        data:
          'U2FsdGVkX19aSyXHovyOjRIpcCEACqa/36+KLpLr7HQ+UqPq6MXQ9Qp8Uei65PTyLNVuTK/MCGgNegaNBSclJXBzw87IWG9YWXneOL8PVD5qyAWIc05xqEZDIC1dFq3EX5Oio6y2clohCZp6Z1jjHgn25514pOyqIo9RGANou+BQ+Vvee2BQ7jyhIKH9Ztwd',
        nodesAccess: [
          {
            nodeType: 'n8n-nodes-base.emailSend',
            date: new Date('2019-10-26T06:48:32.053Z'),
          },
        ],
      };
      const credentials: IWorkflowCredentials = {
        smtp: { 'mail-default': mailDefaultCred },
      };
      credentials;
      return {
        credentials,
        hooks: {
          nodeExecuteAfter: [
            async (nodeName: string, data: ITaskData): Promise<void> => {
              nodeExecutionOrder.push(nodeName);
            },
          ],
          workflowExecuteAfter: [
            async (fullRunData: IRun): Promise<void> => {
              waitPromise.resolve(fullRunData);
            },
          ],
        },
        encryptionKey: 'test',
        timezone: 'UTC',
        webhookBaseUrl: '',
        webhookTestBaseUrl: '',
      };
    }

    const waitPromise = await createDeferredPromise<IRun>();
    const additionalData = WorkflowExecuteAdditionalData(waitPromise, [
      'Start',
    ]);
    additionalData.encryptionKey = 'Os3O2weRk7HSwOV1cpM/z+6kZPGgqAFj';
    const executionMode = 'manual';

    const workflowExecute = new WorkflowExecute(additionalData, executionMode);
    const executionData = await workflowExecute.run(
      workflowInstance,
      undefined,
    );

    console.log('executionData', executionData);
    return waitPromise.promise();
  }
}
