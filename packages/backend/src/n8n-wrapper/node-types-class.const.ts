import {
  INodeTypeData,
  IExecuteFunctions,
  INodeExecutionData,
  INodeParameters,
  INodeTypes,
  INodeType,
} from 'n8n-workflow';
import { InputPlaceholderRepository } from './input-placeholder.repository';

export const FunctionNode = new (require('n8n-nodes-base/dist/nodes/Function.node')).Function();
export const FunctionItemNode = new (require('n8n-nodes-base/dist/nodes/FunctionItem.node')).FunctionItem();
export const EmailSendNode = new (require('n8n-nodes-base/dist/nodes/EmailSend.node')).EmailSend();
export const ExecuteCommandNode = new (require('n8n-nodes-base/dist/nodes/ExecuteCommand.node')).ExecuteCommand();

const resolveInputPlaceholder = (id: string) =>
  InputPlaceholderRepository._data.get(id);

export class NodeTypesClass implements INodeTypes {
  nodeTypes: INodeTypeData = {
    'n8n-nodes-base.merge': {
      sourcePath: '',
      type: {
        description: {
          displayName: 'Merge',
          name: 'merge',
          icon: 'fa:clone',
          group: ['transform'],
          version: 1,
          description:
            'Merges data of multiple streams once data of both is available',
          defaults: {
            name: 'Merge',
            color: '#00cc22',
          },
          inputs: ['main', 'main'],
          outputs: ['main'],
          properties: [
            {
              displayName: 'Mode',
              name: 'mode',
              type: 'options',
              options: [
                {
                  name: 'Append',
                  value: 'append',
                  description:
                    'Combines data of both inputs. The output will contain items of input 1 and input 2.',
                },
                {
                  name: 'Pass-through',
                  value: 'passThrough',
                  description:
                    'Passes through data of one input. The output will conain only items of the defined input.',
                },
                {
                  name: 'Wait',
                  value: 'wait',
                  description:
                    'Waits till data of both inputs is available and will then output a single empty item.',
                },
              ],
              default: 'append',
              description:
                'How data should be merged. If it should simply<br />be appended or merged depending on a property.',
            },
            {
              displayName: 'Output Data',
              name: 'output',
              type: 'options',
              displayOptions: {
                show: {
                  mode: ['passThrough'],
                },
              },
              options: [
                {
                  name: 'Input 1',
                  value: 'input1',
                },
                {
                  name: 'Input 2',
                  value: 'input2',
                },
              ],
              default: 'input1',
              description:
                'Defines of which input the data should be used as output of node.',
            },
          ],
        },
        async execute(
          this: IExecuteFunctions,
        ): Promise<INodeExecutionData[][]> {
          // const itemsInput2 = this.getInputData(1);
          const returnData: INodeExecutionData[] = [];
          const mode = this.getNodeParameter('mode', 0) as string;
          if (mode === 'append') {
            // Simply appends the data
            for (let i = 0; i < 2; i++) {
              returnData.push.apply(returnData, this.getInputData(i));
            }
          } else if (mode === 'passThrough') {
            const output = this.getNodeParameter('output', 0) as string;
            if (output === 'input1') {
              returnData.push.apply(returnData, this.getInputData(0));
            } else {
              returnData.push.apply(returnData, this.getInputData(1));
            }
          } else if (mode === 'wait') {
            returnData.push({ json: {} });
          }
          return [returnData];
        },
      },
    },
    '_n8n-nodes-base.start': {
      sourcePath: '',
      type: {
        description: {
          displayName: 'Start',
          name: 'start',
          group: ['input'],
          version: 1,
          description: 'Starts the workflow execution from this node',
          defaults: {
            name: 'Start',
            color: '#553399',
          },
          inputs: [],
          outputs: ['main'],
          properties: [],
        },
        execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
          const items = this.getInputData();
          return this.prepareOutputData(items);
        },
      },
    },
    'n8n-nodes-base.emailSend': { sourcePath: '', type: EmailSendNode },
    'n8n-nodes-base.function': { sourcePath: '', type: FunctionNode },
    'n8n-nodes-base.functionItem': { sourcePath: '', type: FunctionItemNode },
    'n8n-nodes-base.executeCommand': {
      sourcePath: '',
      type: ExecuteCommandNode,
    },
    'n8n-nodes-base.start': {
      sourcePath: '',
      type: {
        description: {
          displayName: 'Start',
          name: 'start',
          group: ['input'],
          version: 1,
          description: 'Starts the workflow execution from this node',
          defaults: {
            name: 'Start',
            color: '#553399',
          },
          inputs: [],
          outputs: ['main'],
          properties: [
            {
              displayName: 'Binary Property',
              name: 'inputPlaceholder',
              type: 'string',
              default: '',
              required: false,
              description:
                'Name of the binary property from which to<br />read the PDF file.',
            },
          ],
        },
        execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
          const items = this.getInputData();
          const inputPlaceholder = this.getNodeParameter(
            'inputPlaceholder',
            NaN,
          ) as string;
          console.log('inputPlaceholder', inputPlaceholder);
          items.length = 0;
          const resolvedInput: any = resolveInputPlaceholder(inputPlaceholder);
          items.push(
            ...resolvedInput.transactions.map(transaction => ({
              json: transaction,
            })),
          );
          return this.prepareOutputData(items);
        },
      },
    },
    'finrelay-nodes.wireTransfer': {
      sourcePath: '',
      type: {
        description: {
          displayName: 'Start',
          name: 'start',
          group: ['input'],
          version: 1,
          description: 'Starts the workflow execution from this node',
          defaults: {
            name: 'Start',
            color: '#553399',
          },
          inputs: [],
          outputs: ['main'],
          properties: [
            {
              displayName: 'Binary Property',
              name: 'amount',
              type: 'number',
              default: '',
              required: false,
              description:
                'Name of the binary property from which to<br />read the PDF file.',
            },
            {
              displayName: 'Binary Property',
              name: 'counterPartyName',
              type: 'string',
              default: '',
              required: false,
              description:
                'Name of the binary property from which to<br />read the PDF file.',
            },
            {
              displayName: 'Binary Property',
              name: 'iban',
              type: 'string',
              default: '',
              required: false,
              description:
                'Name of the binary property from which to<br />read the PDF file.',
            },
            {
              displayName: 'Binary Property',
              name: 'usePercentage',
              type: 'boolean',
              default: '',
              required: false,
              description:
                'Name of the binary property from which to<br />read the PDF file.',
            },
          ],
        },
        execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
          console.log("WIRETRANSFER123");
          const transferSingleItem = (item: any) => {
            try {
            const parameters = {
              amount: this.getNodeParameter("amount", NaN) as number,
              counterPartyName: this.getNodeParameter("counterPartyName", NaN) as string,
              iban: this.getNodeParameter("iban", NaN) as string,
              usePercentage: this.getNodeParameter("usePercentage", NaN) as boolean
            };
            console.warn('WIRETRANSFER', parameters);
          } catch(err) {
            console.error(err);
          }
          };
          const inputData = this.getInputData();
          if (Array.isArray(inputData)) {
            for(let item of inputData.map((e) => e.json)) {
              transferSingleItem(item);
            }
          } else {
            transferSingleItem(inputData);
          }
          return this.prepareOutputData(inputData);
        },
      },
    },
  };
  async init(nodeTypes: INodeTypeData): Promise<void> {}
  getAll(): INodeType[] {
    return Object.values(this.nodeTypes).map(data => data.type);
  }
  getByName(nodeType: string): INodeType {
    return this.nodeTypes[nodeType].type;
  }
}
