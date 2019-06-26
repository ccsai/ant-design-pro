function userList(req, res) {
  let list = [];
  if (req.query.page == '1' || !req.query.page) {
    list = [
      {
        userId: '01',
        userName: 'jack',
        realName: '张三',
        userStatus: 1
      },
      {
        userId: '02',
        userName: 'bob',
        realName: '小明',
        userStatus: 0
      },
    ]
  } else if (req.query.page == '2') {
    list = [
      {
        userId: '03',
        userName: 'she',
        realName: '比迪',
        userStatus: 1
      },
    ];
  }


  const data = {
    code: 200,
    msg: '',
    total: 3,
    list: list,
  };
  return res.json(data);
}

export default {
  'GET /api/userList': userList,
  'POST /api/userAdd': function (req, res) {
    return res.json({code: 200, msg: ''});
  },
  'POST /api/detail': function (req, res) {
    let row = {};
    if (req.body.userId == '01') {
      row = {
        userId: '01',
        userName: 'jack',
        realName: '张三',
        userStatus: 1
      }
    } else if (req.body.userId == '02') {
      row = {
        userId: '02',
        userName: 'bob',
        realName: '小明',
        userStatus: 0
      }
    }
    return res.json({
      code: 200, msg: '',
      row: row
    });
  },
  'POST /api/update': function (req, res) {
    return res.json({code: 200, msg: ''});
  },
};
