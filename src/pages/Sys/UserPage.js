import React, {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio} from 'antd';
import {connect} from 'dva';

import styles from './UserPage.less';

const CreateForm = Form.create({name: 'form_in_modal'})(
  // eslint-disable-next-line
  class extends Component {
    render() {
      const {visible, onCancel, onCreate, form} = this.props;
      const {getFieldDecorator} = form;
      return (
        <Modal visible={visible} title="用户表单" okText="保存" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="用户编号" className={styles.hidden}>
              {getFieldDecorator('userId')(<Input type="hidden"/>)}
            </Form.Item>
            <Form.Item label="用户名">
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名!'}],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('realName')(<Input type="input"/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

@connect(({sys, loading}) => ({
  sys,
  loading: loading.models.sys,
}))
@Form.create()
class UserPage extends PureComponent {
  state = {
    visible: false,
    modalOperateType: ''
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <a href="#" onClick={() => this.showUpdateModal(record.userId)}>修改</a> | <a href="#">删除</a>
        </span>
      ),
    },
  ];

  showAddModal = () => {
    this.setState({visible: true, modalOperateType: 'add'});
  };

  showUpdateModal = (userId) => {
    console.log(userId)
    this.setState({visible: true, modalOperateType: 'update'});
    // loa
    const {dispatch} = this.props;
    dispatch({
      type: 'sys/detail',
      payload: {
        userId: userId
      },
      callback: response => {
        const {form} = this.updateFormRef.props;
        form.setFieldsValue(response.row);
      }
    })
  };


  handleCancel = () => {
    this.setState({visible: false});
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'sys/fetch',
    });
  }

  check = () => {
    const {form} = this.updateFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const {dispatch} = this.props;
      dispatch({
        type: 'sys/add',
        payload: values,
      }).then(() => {
        dispatch({
          type: 'sys/fetch',
        });
      });

      form.resetFields();
      this.setState({visible: false});
    });
  };

  saveUpdateForm = updateFormRef => {
    this.updateFormRef = updateFormRef;
  };

  render() {
    const {
      sys: {
        data: {total, list},
      },
      loading,
    } = this.props;

    const paginationProps = {
      pageSizeOptions: ['2', '5', '10', '50'],
      pageSize: 2,
      showTotal: total => total,
    };
    return (
      <div>
        <Button type="primary" onClick={this.showAddModal}>
          添加
        </Button>

        <Table
          // loading={loading}
          rowKey={data => data.userId}
          dataSource={list}
          columns={this.columns}
          pagination={paginationProps}
        />

        {/*表单*/}
        <CreateForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.check}
          wrappedComponentRef={this.saveUpdateForm}
        />
      </div>
    );
  }
}

export default UserPage;
