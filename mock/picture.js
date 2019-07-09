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
      level: 1,
      sortNo: 1,
      isShow: 1,
      children: [
        {
          labelId: '1.1',
          labelName: '标签1.1',
          level: 2,
          sortNo: 1,
          isShow: 1,
          children: [
            {
              labelId: '1.1.1',
              labelName: '标签1.1.1',
              level: 3,
              sortNo: 1,
              isShow: 1,
              children: [
                {
                  labelId: '1.1.1.1',
                  labelName: '标签1.1.1.1',
                  level: 4,
                  sortNo: 1,
                  isShow: 1,
                },
                {
                  labelId: '1.1.1.2',
                  labelName: '标签1.1.1.2',
                  level: 4,
                  sortNo: 2,
                  isShow: 1,
                },
                {
                  labelId: '1.1.1.3',
                  labelName: '标签1.1.1.3',
                  level: 4,
                  sortNo: 3,
                  isShow: 1,
                },
              ]
            },
            {
              labelId: '1.1.2',
              labelName: '标签1.1.2',
              level: 3,
              sortNo: 4,
              isShow: 1,
            }
          ]
        },
        {
          labelId: '1.2',
          labelName: '标签1.2',
          level: 2,
          sortNo: 2,
          isShow: 1,
        },
      ],
    },
    {
      labelId: '2',
      labelName: '标签2',
      level: 1,
      sortNo: 2,
      isShow: 1,
      children: [
        {
          labelId: '2.1',
          labelName: '标签2.1',
          level: 2,
          sortNo: 1,
          isShow: 1,
        },
        {
          labelId: '2.2',
          labelName: '标签2.2',
          level: 2,
          sortNo: 3,
          isShow: 1,
        },
      ]
    },
    {
      labelId: '3',
      labelName: '标签3',
      level: 1,
      sortNo: 3,
      isShow: 1,
      children: [
        {
          labelId: '3.1',
          labelName: '标签3.1',
          level: 2,
          sortNo: 1,
          isShow: 1,
        },
        {
          labelId: '3.2',
          labelName: '标签3.2',
          level: 2,
          sortNo: 2,
          isShow: 1,
        },
      ]
    }
  ]
  return res.json(labelTree)
}

function findLabelTreeTable(req,res) {
  let labelTree;
  if (req.body.page == 1 || !req.body.page){
    labelTree = [
      {
        labelId: '1',
        labelName: '标签1',
        level: 1,
        sortNo: 1,
        isShow: 1,
        children: [
          {
            labelId: '1.1',
            labelName: '标签1.1',
            level: 2,
            sortNo: 1,
            isShow: 1,
            children: [
              {
                labelId: '1.1.1',
                labelName: '标签1.1.1',
                level: 3,
                sortNo: 1,
                isShow: 1,
                children: [
                  {
                    labelId: '1.1.1.1',
                    labelName: '标签1.1.1.1',
                    level: 4,
                    sortNo: 1,
                    isShow: 1,
                  },
                  {
                    labelId: '1.1.1.2',
                    labelName: '标签1.1.1.2',
                    level: 4,
                    sortNo: 2,
                    isShow: 1,
                  },
                  {
                    labelId: '1.1.1.3',
                    labelName: '标签1.1.1.3',
                    level: 4,
                    sortNo: 3,
                    isShow: 1,
                  },
                ]
              },
              {
                labelId: '1.1.2',
                labelName: '标签1.1.2',
                level: 3,
                sortNo: 4,
                isShow: 1,
              }
            ]
          },
          {
            labelId: '1.2',
            labelName: '标签1.2',
            level: 2,
            sortNo: 2,
            isShow: 1,
          },
        ],
      },
      {
        labelId: '2',
        labelName: '标签2',
        level: 1,
        sortNo: 2,
        isShow: 1,
        children: [
          {
            labelId: '2.1',
            labelName: '标签2.1',
            level: 2,
            sortNo: 1,
            isShow: 1,
          },
          {
            labelId: '2.2',
            labelName: '标签2.2',
            level: 2,
            sortNo: 3,
            isShow: 1,
          },
        ]
      },
    ]
  } else if (req.body.page == 2) {
    labelTree = [
      {
        labelId: '3',
        labelName: '标签3',
        level: 1,
        sortNo: 3,
        isShow: 1,
        children: [
          {
            labelId: '3.1',
            labelName: '标签3.1',
            level: 2,
            sortNo: 1,
            isShow: 1,
          },
          {
            labelId: '3.2',
            labelName: '标签3.2',
            level: 2,
            sortNo: 2,
            isShow: 1,
          },
        ]
      }
    ]
  }
  const resJson = {
    code: 200,
    msg: '',
    total: 3,
    list: labelTree
  }
  return res.json(resJson)
}

function findLabelDetail(req,res) {
  let detail = {
    pLabelId: 'root',
    labelId: '1',
    labelName: '标签1',
    level: 1,
    sortNo: 1,
    isShow: 1,
  }
  return res.json(detail)
}

function addLabel(req,res) {
  let result = {
    code: 200,
    msg: 'add success!'
  }
  return res.json(result)
}

function modifyLabel(req,res) {
  let result = {
    code: 200,
    msg: 'modify success!'
  }
  return res.json(result)
}

function findProjectDetail() {
  let projectDetail = {
    msg: '',
    code: 200,

  }
}

export default {
  'POST /project/treeTable': treeTable,
  'POST /project/labelTree': findLabelTree,
  'POST /project/labelTreeTable': findLabelTreeTable,
  'POST /label/findLabelDetail': findLabelDetail,
  'POST /label/addLabel': addLabel,
  'POST /label/modifyLabel': modifyLabel,
}
