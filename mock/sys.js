function userList(req, res) {
  const dataSource = [
    {
      userId: '01',
      userName: 'jack',
      realName: '张三',
    },
    {
      userId: '02',
      userName: 'bob',
      realName: '小明',
    },
    {
      userId: '03',
      userName: 'she',
      realName: '比迪',
    },
  ];

  const data = {
    code: 200,
    msg: '',
    total: dataSource.length,
    list: dataSource,
  };
  return res.json(data);
}

export default {
  'GET /api/userList': userList,
};
