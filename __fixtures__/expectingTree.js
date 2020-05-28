const expectingTree = [
  {
    name: 'common',
    value: [
      { name: 'follow', value: false, status: 'added' },
      { name: 'setting1', value: 'Value 1', status: 'unchanged' },
      { name: 'setting2', beforeValue: 200, status: 'deleted' },
      {
        name: 'setting3',
        beforeValue: true,
        value: { key: 'value' },
        status: 'modified',
      },
      { name: 'setting4', value: 'blah blah', status: 'added' },
      { name: 'setting5', value: { key5: 'value5' }, status: 'added' },
      {
        name: 'setting6',
        value: [
          { name: 'key', value: 'value', status: 'unchanged' },
          { name: 'ops', value: 'vops', status: 'added' },
        ],
      },
    ],
  },
  {
    name: 'group1',
    value: [
      {
        name: 'baz',
        beforeValue: 'bas',
        value: 'bars',
        status: 'modified',
      },
      { name: 'foo', value: 'bar', status: 'unchanged' },
      {
        name: 'nest',
        beforeValue: { key: 'value' },
        value: 'str',
        status: 'modified',
      },
    ],
  },
  {
    name: 'group2',
    beforeValue: { abc: 12345 },
    status: 'deleted',
  },
  {
    name: 'group3',
    value: { fee: 100500 },
    status: 'added',
  },
];

export default expectingTree;
