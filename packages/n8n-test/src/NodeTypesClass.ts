import {
  INodeTypeData,
  IExecuteFunctions,
  INodeExecutionData,
  INodeParameters,
  INodeTypes,
  INodeType,
} from 'n8n-workflow';
import { set } from 'object-path';

export const FunctionNode = new (require('n8n-nodes-base/dist/nodes/Function.node')).Function();
export const ExecuteCommandNode = new (require('n8n-nodes-base/dist/nodes/ExecuteCommand.node')).ExecuteCommand();

const resolveInputId = (id: string) => ({id, foo: 'bar', ts: new Date()});

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
          this: IExecuteFunctions
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
    'n8n-nodes-base.set': {
      sourcePath: '',
      type: {
        description: {
          displayName: 'Set',
          name: 'set',
          group: ['input'],
          version: 1,
          description: 'Sets a value',
          defaults: {
            name: 'Set',
            color: '#0000FF',
          },
          inputs: ['main'],
          outputs: ['main'],
          properties: [
            {
              displayName: 'Keep Only Set',
              name: 'keepOnlySet',
              type: 'boolean',
              default: false,
              description:
                'If only the values set on this node should be<br />kept and all others removed.',
            },
            {
              displayName: 'Values to Set',
              name: 'values',
              placeholder: 'Add Value',
              type: 'fixedCollection',
              typeOptions: {
                multipleValues: true,
              },
              description: 'The value to set.',
              default: {},
              options: [
                {
                  name: 'number',
                  displayName: 'Number',
                  values: [
                    {
                      displayName: 'Name',
                      name: 'name',
                      type: 'string',
                      default: 'propertyName',
                      description:
                        'Name of the property to write data to.<br />Supports dot-notation.<br />Example: "data.person[0].name"',
                    },
                    {
                      displayName: 'Value',
                      name: 'value',
                      type: 'number',
                      default: 0,
                      description: 'The number value to write in the property.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
          const items = this.getInputData();
          const returnData: INodeExecutionData[] = [];
          let item: INodeExecutionData;
          for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            item = items[itemIndex];
            const newItem: INodeExecutionData = {
              json: JSON.parse(JSON.stringify(item.json)),
            };
            // Add number values
            (this.getNodeParameter(
              'values.number',
              itemIndex,
              []
            ) as INodeParameters[]).forEach(setItem => {
              set(newItem.json, setItem.name as string, setItem.value);
            });
            returnData.push(newItem);
          }
          return this.prepareOutputData(returnData);
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
    'n8n-nodes-base.function': { sourcePath: '', type: FunctionNode },
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
                        name: 'inputId',
                        type: 'string',
                        default: '',
                        required: false,
                        description: 'Name of the binary property from which to<br />read the PDF file.',
                    },
                ]
          },
          execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
            const items = this.getInputData();
            const inputId = this.getNodeParameter('inputId', NaN) as string;
            console.log('inputId', inputId);
            items.length = 0;
              const json: any = resolveInputId(inputId);
              console.log((json.ts.getTime()));
            items.push({json});                                                  
            return this.prepareOutputData(items);
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
