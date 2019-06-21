// import React, { PureComponent, Fragment } from 'react';
// import { Table } from 'antd';
// import { connect } from 'dva';
//
// @connect(({ sys, loading }) => ({
//   sys,
//   loading: loading.models.sys,
// }))
// class userPage extends PureComponent {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'sys/fetch',
//     });
//   }
//
//   render() {
//     const {
//       sys: { dataSource },
//       loading,
//     } = this.props;
//     const columns = [
//       {
//         title: 'ID',
//         dataIndex: 'userId',
//         key: 'userId',
//       },
//       {
//         title: '用户名',
//         dataIndex: 'userName',
//         key: 'userName',
//       },
//       {
//         title: '姓名',
//         dataIndex: 'realName',
//         key: 'realName',
//       },
//       {
//         title: '操作',
//         key: 'oper',
//         render: (text, record) => (
//           <span>
//             <a href="#">修改</a> |<a href="#">删除</a>
//           </span>
//         ),
//       },
//     ];
//     const a = [
//       {
//         userId: '01',
//         userName: 'jack',
//         realName: '张三',
//       },
//       {
//         userId: '02',
//         userName: 'bob',
//         realName: '小明',
//       },
//       {
//         userId: '03',
//         userName: 'she',
//         realName: '比迪',
//       },
//     ];
//     console.log({ dataSource });
//     return <Table loading={loading} dataSource={dataSource} columns={columns} />;
//   }
// }
//
// export default userPage;
