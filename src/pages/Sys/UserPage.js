import React, {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select} from 'antd';
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
            <Form.Item label="状态">
              {getFieldDecorator('userStatus')(
                <Radio.Group>
                  <Radio value={1}>有效</Radio>
                  <Radio value={0}>无效</Radio>
                </Radio.Group>)}
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
    modalOperateType: '',
    searchValues: {}
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
      title: '用户状态',
      dataIndex: 'userStatus',
      render: (text) => {
        return text ? '有效' : '无效';
      }
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
    const {form} = this.updateFormRef.props;
    form.resetFields();
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'sys/fetch',
    });
  }

  //添加修改验证
  check = () => {
    const {form} = this.updateFormRef.props;
    const {modalOperateType} = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const {dispatch} = this.props;
      if (modalOperateType == 'add') {
        dispatch({
          type: 'sys/add',
          payload: values,
        }).then(() => {
          dispatch({
            type: 'sys/fetch',
          });
        });
      } else if (modalOperateType == 'update') {
        dispatch({
          type: 'sys/update',
          payload: values,
        }).then(() => {
          dispatch({
            type: 'sys/fetch',
          });
        });
      }

      form.resetFields();
      this.setState({visible: false});
    });
  };

  saveUpdateForm = updateFormRef => {
    this.updateFormRef = updateFormRef;
  };

  //搜索表单
  renderSearchForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;

    return <Form layout="inline">
      <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} type="flex" align="middle">
        <Col span={6}>
          <Form.Item label="用户名">
            {getFieldDecorator('userName')(<Input placeholder="请输入用户名"/>)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="用户状态">
            {getFieldDecorator('suerStatus')(
              <Select
                showSearch
                style={{width: 175}}
              >
                <Select.Option value=""></Select.Option>
                <Select.Option value="1">Jack</Select.Option>
                <Select.Option value="0">Lucy</Select.Option>
              </Select>)}
          </Form.Item>
        </Col>
        <Col span={6} offset={6}>
          <Form.Item className={styles.right}>
            <Button type="primary" onClick={this.search}>
              查询
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }

  search = () => {
    const {form,dispatch} = this.props;
    form.validateFields((err, values) => {
      this.setState({searchValues: values});
      dispatch({
        type: 'sys/fetch',
        payload: values
      });
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const {searchValues} = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchValues
    }

    const {dispatch} = this.props;
    dispatch({
      type: 'sys/fetch',
      payload: params
    });
  }


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
      total: total
    };
    return (
      <div>
        <div className={styles.moudal}>
          {this.renderSearchForm()}
        </div>

        <div>
          <div className={styles.moudal}>
            <Button type="primary" onClick={this.showAddModal}>
              添加
            </Button>
          </div>

          <Table
            // loading={loading}
            rowKey={data => data.userId}
            dataSource={list}
            columns={this.columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />
        </div>

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
