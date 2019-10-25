export const TEST_WORKFLOW_DATA = {
  name: 'simple',
  nodes: [
    {
      parameters: {},
      name: 'Start',
      type: 'n8n-nodes-base.start',
      typeVersion: 1,
      position: [250, 300],
    },
    {
      parameters: {
        functionCode: 'return [{ json: { foo: Math.random() } }];',
      },
      name: 'Function',
      type: 'n8n-nodes-base.function',
      typeVersion: 1,
      position: [400, 300],
    },
    {
      parameters: {
        functionCode: 'console.log(items);\nreturn items;',
      },
      name: 'Function1',
      type: 'n8n-nodes-base.function',
      typeVersion: 1,
      position: [550, 300],
    },
    {
      parameters: {
        command: '=echo \'{{$node["Function"].data["foo"]}}\' >> /tmp/hugo',
      },
      name: 'Execute Command',
      type: 'n8n-nodes-base.executeCommand',
      typeVersion: 1,
      position: [540, 500],
    },
  ],
  connections: {
    Start: {
      main: [
        [
          {
            node: 'Function',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
    Function: {
      main: [
        [
          {
            node: 'Function1',
            type: 'main',
            index: 0,
          },
          {
            node: 'Execute Command',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
  },
  active: false,
  settings: {},
  id: '2',
};
