function treeTable(req,res) {
  let total = 3;
  let rows = [
    {
      projectId: '01',
      projectName: '项目1',
      level: 1,
      sortNo: 1,
      projectStatus: 1,
      pProjectId: 'root',
      children: [
        {
          projectId: '04',
          projectName: '项目1.1',
          level: 2,
          sortNo: 3,
          projectStatus: 1,
          pProjectId: 'root',
          children: [
            {
              projectId: '05',
              projectName: '项目1.1.1',
              level: 3,
              sortNo: 2,
              projectStatus: 1,
              pProjectId: 'root'
            },

            {
              projectId: '06',
              projectName: '项目1.1.2',
              level: 3,
              sortNo: 4,
              projectStatus: 1,
              pProjectId: 'root'
            },]
        },
      ]
    },
    {
      projectId: '02',
      projectName: '项目2',
      level: 1,
      sortNo: 2,
      projectStatus: 1,
      pProjectId: 'root'
    },
    {
      projectId: '03',
      projectName: '项目3',
      level: 1,
      sortNo: 3,
      projectStatus: 1,
      pProjectId: 'root'
    },
  ];
  let data = {
    rows: rows,
    total: total
  }
  return res.json(data);
}


function findLabelTree(req,res) {
  let labelTree = [
    {
      labelId: '1',
      labelName: '标签1',
      children: [
        {
          labelId: '1.1',
          labelName: '标签1.1',
          children: [
            {
              labelId: '1.1.1',
              labelName: '标签1.1.1',
              children: [
                {
                  labelId: '1.1.1.1',
                  labelName: '标签1.1.1.1',
                },
                {
                  labelId: '1.1.1.2',
                  labelName: '标签1.1.1.2',
                },
                {
                  labelId: '1.1.1.3',
                  labelName: '标签1.1.1.3',
                },
              ]
            },
            {
              labelId: '1.1.2',
              labelName: '标签1.1.2',
            }
          ]
        },
        {
          labelId: '1.2',
          labelName: '标签1.2',
        },
      ],
    },
    {
      labelId: '2',
      labelName: '标签2',
      children: [
        {
          labelId: '2.1',
          labelName: '标签2.1',
        },
        {
          labelId: '2.2',
          labelName: '标签2.2',
        },
      ]
    },
    {
      labelId: '3',
      labelName: '标签3',
      children: [
        {
          labelId: '3.1',
          labelName: '标签3.1',
        },
        {
          labelId: '3.2',
          labelName: '标签3.2',
        },
      ]
    }
  ]
  return res.json(labelTree)
}

export default {
  'POST /project/treeTable': treeTable,
  'POST /project/labelTree': findLabelTree
}
