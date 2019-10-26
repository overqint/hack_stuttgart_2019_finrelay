import { Injectable } from '@nestjs/common';
import { N8NWrapperService } from '../n8n-wrapper/n8n-wrapper.service';
import { InputPlaceholderRepository } from '../n8n-wrapper/input-placeholder.repository';
import { AccountsRepository } from '../accounts/accounts.repository';

@Injectable()
export class ContractExecutorService {
  constructor(
    private n8nWrapperService: N8NWrapperService,
    private inputPlaceholderRepository: InputPlaceholderRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute(contract: any) {
    console.log('[ContractExecutorService] executing contract:', contract);
    const workflowData: any = await this.createWorkflow(contract);
    try {
      const result = await this.n8nWrapperService.runWorkflow(workflowData);
      console.log(
        'n8nWrapperService result',
        JSON.stringify(result.data.resultData.runData.Function1, null, 2),
      );
    } catch (err) {
      const rethrownErr: Error | any = new Error('Error executing workflow.');
      rethrownErr.cause = err;
      console.error(rethrownErr);
    }
  }
  async createWorkflow(contract: any) {
    const transactions = (await this.accountsRepository.getTransactionsByAccountId(
      'DBank1',
    )).slice(0, 1);
    const inputPlaceholder = Date.now().toString();
    const resolvedPlaceholder = {
      _id: inputPlaceholder,
      contract,
      transactions,
    };
    this.inputPlaceholderRepository.save(resolvedPlaceholder);
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
        {
          name: 'Function',
          type: 'n8n-nodes-base.functionItem',
          parameters: {
            functionCode:
              'const transaction = item; console.log("Handling transaction.", transaction); return item;',
          },
          typeVersion: 1,
          position: [400, 300],
        },
        {
          name: 'Send Email',
          type: 'n8n-nodes-base.emailSend',
          parameters: {
            fromEmail: 'ralph.greschner.dev@gmail.com',
            toEmail: 'ralph.greschner.dev@gmail.com',
            subject: 'Geile Sache',
            text:
              '=balbla {{$node["Start"].data.paymentReference}} am {{$node["Start"].data.valueDate}}',
          },

          typeVersion: 1,
          position: [400, 470],
          credentials: {
            smtp: 'mail-default',
          },
        },
      ],
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
