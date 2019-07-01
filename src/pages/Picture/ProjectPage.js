import React, {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select} from 'antd';
import {connect} from 'dva';
import UserListSelectModal from '@/components/User/UserListSelectModal';
import UserListTable from '@/components/User/UserListTable';

import styles from './ProjectPage.less';

/**
 * 项目列表
 */
class ProjectTreeTable extends PureComponent {
  render() {
    const {columns, rows, loading, rowKey, paginationProps} = this.props;
    const pagination = {
      ...paginationProps
    }

    return (
      <Table columns={columns}
             pagination={paginationProps}
             dataSource={rows}
             loading={loading}
             rowKey={rowKey}
      />
    );
  }
}


/**
 * 添加修改表单
 * @type {ConnectedComponentClass<{propTypes?: React.WeakValidationMap<T>, contextTypes?: React.ValidationMap<any>, defaultProps?: Partial<T>, displayName?: string, new(): {render(): *, propTypes?: React.WeakValidationMap<T>, contextTypes?: React.ValidationMap<any>, defaultProps?: Partial<T>, displayName?: string}, prototype: {render(): *, propTypes?: React.WeakValidationMap<T>, contextTypes?: React.ValidationMap<any>, defaultProps?: Partial<T>, displayName?: string}}, Omit<TOwnProps, keyof WrappedFormInternalProps>>}
 */
const AddForm = Form.create({name: 'add_form_dlg'})(
  class extends Component {
    render() {
      const {form, visible, onCancel, openUserListModal,userList,projectUserRowSelection,removeProjectUser} = this.props;
      const {getFieldDecorator} = form;
      const {TextArea} = Input;
      return (
        <div>
          <Modal
            visible={visible}
            title="项目表单"
            okText="保存"
            onCancel={onCancel}
            // onOk={onCreate}
          >
            <Form layout="horizontal">
              <Form.Item label="上级项目">
                {getFieldDecorator('pProjectId')(<Input/>)}
              </Form.Item>
              <Form.Item label="项目名称">
                {getFieldDecorator('projectName', {
                  rules: [{required: true, message: '请输入项目名称！'}],
                })(<Input/>)}
              </Form.Item>
              <Form.Item label="排序">
                {getFieldDecorator('sortNo')(<Input/>)}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('projectStatus', {initialValue: "1",})(
                  <Select
                    showSearch
                  >
                    <Select.Option value="1">有效</Select.Option>
                    <Select.Option value="0">无效</Select.Option>
                  </Select>)}
              </Form.Item>
              <Form.Item label="关键字">
                {getFieldDecorator('keywords')(<TextArea
                  autosize={{minRows: 2, maxRows: 6}}
                />)}
              </Form.Item>
              <Form.Item label="描述">
                {getFieldDecorator('projectDesc')(<TextArea
                  autosize={{minRows: 2, maxRows: 6}}
                />)}
              </Form.Item>
              <Form.Item label="项目人员">
                <Button type="primary" size="small" onClick={openUserListModal}>添加</Button>
                <Button size="small" onClick={removeProjectUser}>移出</Button>
                {getFieldDecorator('userList')(
                  <UserListTable
                    dataSource={userList}
                    rowSelection={projectUserRowSelection}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  },
);

@connect(({sys, project, loading}) => ({
  sys,
  project,
  loading: loading.models.project,
}))
class ProjectPage extends PureComponent {

  state = {
    paginationProps: {},
    addFormVisible: false,
    userListModalVisible: false,
    allUserList: [],
    selectedUserIds: [],
    selectedUserList: [],
    projectRemoveUserIds: [],
    projectUserList: [],
    projectUserIds: []
  }

  projectTreeTableColums = [
    {
      title: '编号',
      dataIndex: 'projectId',
      key: 'projectId',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: '层级',
      dataIndex: 'level',
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <a href="#">修改</a> | <a href="#">删除</a>
        </span>
      ),
    },
  ]


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'project/treeTable',
    });
  }

  /*********** 添加表单对话框方法**************/
  showAddModal = () => {
    this.setState({projectUserList: []});
    this.setState({addFormVisible: true})
  }

  getAddFormRef = addFormRef => {
    this.addFormRef = addFormRef;
  }

  closeAddFormModal = () => {
    this.setState({addFormVisible: false});
    const {form} = this.addFormRef.props;
    form.resetFields();
  }

  removeProjectUser = () => {
    let {allUserList,projectRemoveUserIds} = this.state;
    if (projectRemoveUserIds.length > 0){
      for(let i=0;i<projectRemoveUserIds.length;i++){
        allUserList.splice(allUserList.findIndex(item => item.userId == projectRemoveUserIds[i]), 1)
      }
    }
    console.log(allUserList)
    this.setState({allUserList: allUserList})
  }

  openUserListModal = () => {
    this.setState({selectedUserIds: []});
    this.setState({userListModalVisible: true})
    const {dispatch} = this.props;
    dispatch({
      type: 'sys/fetchUserList',
      callback: response => {
        this.setState({allUserList: response.list})
      }
    });
  }

  /*************** 用户选择模态框 *******************/
  closeUserListSelectModal = () => {
    this.setState({userListModalVisible: false})
  }

  addSelectedUserList = () => {
    this.setState({userListModalVisible: false})
    const {selectedUserList,projectUserList} = this.state;
    let userList = [
      ...projectUserList,
      ...selectedUserList
    ]
    var hash = {}
    userList = userList.reduce(function (res,cur) {
      if (!hash[cur.userId]){
        hash[cur.userId] = true;
        res.push(cur);
      }
      return res;
    },[]);
    this.setState({projectUserList: userList})
  }


  render() {
    const {project, loading} = this.props;
    const {total, rows} = project.data;
    const paginationProps = {
      total: total,
      pageSizeOptions: ['2', '5', '10', '50'],
      pageSize: 2,
      showTotal: total => total,
    }

    {/*移出项目用户*/}
    const projectUserRowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({projectRemoveUserIds: selectedRowKeys});
      }
    }

    {/*用户选择的列表设置*/}
    const userRowSelection = {
      selectedRowKeys: this.state.selectedUserIds,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedUserList: selectedRows,selectedUserIds: selectedRowKeys});
      }
    }

    return (
      <div>
        <div className={styles.addBtn}>
          <Button type="primary" onClick={this.showAddModal}>添加</Button>
        </div>
        <div>
          <ProjectTreeTable
            columns={this.projectTreeTableColums}
            loading={loading}
            paginationProps={paginationProps}
            rows={rows}
            rowKey="projectId"/>
        </div>

        {/*添加修改表单*/}
        <AddForm
          visible={this.state.addFormVisible}
          wrappedComponentRef={this.getAddFormRef}
          onCancel={this.closeAddFormModal}
          openUserListModal={this.openUserListModal}
          userList={this.state.projectUserList}
          projectUserRowSelection={projectUserRowSelection}
          removeProjectUser={this.removeProjectUser}
        />
        {/*用户选择列表*/}
        <UserListSelectModal
          visible={this.state.userListModalVisible}
          onOk={this.addSelectedUserList}
          onCancel={this.closeUserListSelectModal}
          allUserList={this.state.allUserList}
          rowSelection={userRowSelection}
        />
      </div>
    )
  }
}

export default ProjectPage;
