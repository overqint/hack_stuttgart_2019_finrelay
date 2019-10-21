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
      return {
        credentials: {},
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
