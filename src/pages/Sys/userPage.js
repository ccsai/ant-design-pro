// import React, { PureComponent } from 'react';
// import { Table, Button, Modal, Form, Input } from 'antd';
// import { connect } from 'dva';
//
// const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
//   // eslint-disable-next-line
//   class extends React.Component {
//     render() {
//       const { visible, onCancel, onCreate, form } = this.props;
//       const { getFieldDecorator } = form;
//       return (
//         <Modal
//           visible={visible}
//           title="Create a new collection"
//           okText="Create"
//           onCancel={onCancel}
//           onOk={onCreate}
//         >
//           <Form layout="vertical">
//             <Form.Item label="Title">
//               {getFieldDecorator('title', {
//                 rules: [{ required: true, message: 'Please input the title of collection!' }],
//               })(<Input />)}
//             </Form.Item>
//             <Form.Item label="Description">
//               {getFieldDecorator('description')(<Input type="textarea" />)}
//             </Form.Item>
//             <Form.Item className="collection-create-form_last-form-item">
//               {getFieldDecorator('modifier', {
//                 initialValue: 'public',
//               })(
//                 <Radio.Group>
//                   <Radio value="public">Public</Radio>
//                   <Radio value="private">Private</Radio>
//                 </Radio.Group>,
//               )}
//             </Form.Item>
//           </Form>
//         </Modal>
//       );
//     }
//   },
// );
//
// class CollectionsPage extends React.Component {
//   state = {
//     visible: false,
//   };
//
//   showModal = () => {
//     this.setState({ visible: true });
//   };
//
//   handleCancel = () => {
//     this.setState({ visible: false });
//   };
//
//   handleCreate = () => {
//     const { form } = this.formRef.props;
//     form.validateFields((err, values) => {
//       if (err) {
//         return;
//       }
//
//       console.log('Received values of form: ', values);
//       form.resetFields();
//       this.setState({ visible: false });
//     });
//   };
//
//   saveFormRef = formRef => {
//     this.formRef = formRef;
//   };
//
//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>
//           New Collection
//         </Button>
//         <CollectionCreateForm
//           wrappedComponentRef={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//         />
//       </div>
//     );
//   }
// }
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
//       sys: {
//         data: { total, list },
//       },
//       loading,
//     } = this.props;
//
//     const paginationProps = {
//       pageSizeOptions: ['2', '5', '10', '50'],
//       pageSize: 2,
//       showTotal: total => total,
//     };
//
//     const columns = [
//       {
//         title: 'ID',
//         dataIndex: 'userId',
//         key: 'userId',
//       },
//       {
//         title: '用户名',
//         dataIndex: 'userName',
//       },
//       {
//         title: '姓名',
//         dataIndex: 'realName',
//       },
//       {
//         title: '操作',
//         render: (text, record) => (
//           <span>
//             <a href="#">修改</a> | <a href="#">删除</a>
//           </span>
//         ),
//       },
//     ];
//     // console.log(data);
//     return (
//       <Table
//         rowKey={data => data.userId}
//         dataSource={list}
//         columns={columns}
//         pagination={paginationProps}
//       />
//     );
//   }
// }
//
// export default userPage;
