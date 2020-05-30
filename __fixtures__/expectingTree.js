const expectingTree = [
  {
    key: 'common',
    children: [
      { key: 'follow', value: false, type: 'added' },
      { key: 'setting1', value: 'Value 1', type: 'unchanged' },
      { key: 'setting2', beforeValue: 200, type: 'deleted' },
      {
        key: 'setting3',
        beforeValue: true,
        value: { key: 'value' },
        type: 'modified',
      },
      { key: 'setting4', value: 'blah blah', type: 'added' },
      { key: 'setting5', value: { key5: 'value5' }, type: 'added' },
      {
        key: 'setting6',
        children: [
          { key: 'key', value: 'value', type: 'unchanged' },
          { key: 'ops', value: 'vops', type: 'added' },
        ],
        type: 'complex',
      },
    ],
    type: 'complex',
  },
  {
    key: 'group1',
    children: [
      {
        key: 'baz',
        beforeValue: 'bas',
        value: 'bars',
        type: 'modified',
      },
      { key: 'foo', value: 'bar', type: 'unchanged' },
      {
        key: 'nest',
        beforeValue: { key: 'value' },
        value: 'str',
        type: 'modified',
      },
    ],
    type: 'complex',
  },
  {
    key: 'group2',
    beforeValue: { abc: 12345 },
    type: 'deleted',
  },
  {
    key: 'group3',
    value: { fee: 100500 },
    type: 'added',
  },
];

export default expectingTree;
