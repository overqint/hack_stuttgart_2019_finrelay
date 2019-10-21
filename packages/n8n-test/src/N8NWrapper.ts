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
import { NodeTypes } from './NodeTypes';

export class N8NWrapper {
  public async foo() {
    const workflowData: any = require('../workflow-data.json');
  const workflowInstance = new Workflow(
    'test',
    workflowData.nodes,
    workflowData.connections,
    false,
    NodeTypes()
  );

  function WorkflowExecuteAdditionalData(
    waitPromise: IDeferredPromise<IRun>,
    nodeExecutionOrder: string[]
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
  const additionalData = WorkflowExecuteAdditionalData(waitPromise, ['Start']);
  const executionMode = 'manual';

  const workflowExecute = new WorkflowExecute(additionalData, executionMode);
  const executionData = await workflowExecute.run(workflowInstance, undefined);

  console.log('executionData', executionData);
  const result = await waitPromise.promise();
  console.log(
    'result',
    JSON.stringify(result.data.resultData.runData['Function1'], null, 2)
  );
  }
}
