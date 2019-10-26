import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowFromContractFactoryService {
  constructor() {}

  async createWorkflow(contract: any, inputPlaceholder: string) {
    if (!contract) {
      throw new Error('Invalid argument: contract');
    }
    const workflow = {
      name: 'simple',
      nodes: [
        {
          name: 'Start',
          type: 'n8n-nodes-base.start',
          parameters: {
            inputPlaceholder,
          },
          typeVersion: 1,
          position: [250, 300],
        },
        contract._id === 'foo' && {
          name: 'Function',
          type: 'n8n-nodes-base.functionItem',
          parameters: {
            functionCode:
              'const transaction = item; console.log("Handling transaction.", transaction); return item;',
          },
          typeVersion: 1,
          position: [400, 300],
        },
        contract._id === 'bar' && {
          name: 'Send Email',
          type: 'n8n-nodes-base.emailSend',
          parameters: {
            fromEmail: 'ralph.greschner.dev@gmail.com',
            toEmail: 'ralph.greschner.dev@gmail.com',
            subject: 'Geile Sache',
            text: `=Transaktion '{{$node["Start"].data.paymentReference}}' am {{$node["Start"].data.valueDate}} Ã¼ber {{$node["Start"].data.amount}} EUR.`,
          },

          typeVersion: 1,
          position: [400, 470],
          credentials: {
            smtp: 'mail-default',
          },
        },
      ].filter(Boolean),
      connections: {},
      active: false,
      settings: {},
      id: '2',
    };

    const connections = {
      Start: { main: [[]] },
    };
    for (let i = 1; i < workflow.nodes.length; ++i) {
      workflow.nodes[i].name = `Node${i}`;
      connections.Start.main[0].push({
        node: `Node${i}`,
        type: 'main',
        index: 0,
      });
    }
    /*
    for (let i = 0; i < workflow.nodes.length - 1; ++i) {
      const node = workflow.nodes[i];
      const nextNode = workflow.nodes[i + 1];
      connections[node.name] = {
        main: [
          [
            {
              node: nextNode.name,
              type: 'main',
              index: 0,
            },
          ],
        ],
      };
    }
    */

    console.log('connections:', connections);
    workflow.connections = connections;
    console.log('workflow:', JSON.stringify(workflow, null, 2));
    return workflow;
  }
}
