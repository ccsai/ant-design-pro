import React, {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select} from 'antd';
import {connect} from 'dva';
import UserListSelectModal from '@/components/User/UserListSelectModal';
import UserListTable from '@/components/User/UserListTable';
import LabelTreeSelect from '@/components/Label/LabelTreeSelect';

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
      const {form, visible, onCancel, openUserListModal, userList, projectUserRowSelection, removeProjectUser, labelTreeData, labelTreeValue, onLabelTreeChange} = this.props;
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
              <Form.Item label="标签">
                {getFieldDecorator('labels')(
                  <LabelTreeSelect
                    treeData={labelTreeData}
                    labelTreeValue={labelTreeValue}
                    onChange={onLabelTreeChange}
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

@connect(({label, sys, project, loading}) => ({
  label,
  sys,
  project,
  loading: loading.models.project,
}))
class ProjectPage extends PureComponent {

  state = {
    paginationProps: {},//列表page
    addFormVisible: false,//添加模态框显示状态
    userListModalVisible: false,//用户选择模态框显示转台
    allUserList: [],//所有用户
    selectedUserIds: [],//已选择的用户编号
    selectedUserList: [],//已选择的用户
    projectRemoveUserIds: [],//选中将要移出项目的用户编号
    projectUserList: [],//保存的项目所属人员
    // projectUserIds: []
    labelTreeValue: [],//标签树值
    labelTreeData: [],//标签树数据
  }

  //项目树表字段
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

  labelTreeValueMap = {}

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'project/treeTable',
    });
  }

  /*********** 添加表单对话框方法**************/
  showAddModal = () => {
    this.setState({projectUserList: [], addFormVisible: true,labelTreeValue: []});
    const {dispatch} = this.props;
    dispatch({
      type: 'label/findTree',
      callback: res => {
        let labelTreeData = this.changelabelTreeNodeName(res);
        this.setState({labelTreeData: labelTreeData});
        this.getLabelTreeValueMap(labelTreeData)
      }
    });
  }

  /**
   * 修改标签树属性名
   * @param list
   * @returns {*}
   */
  changelabelTreeNodeName = (list) => {
    let nodes = list.map(({labelId, labelName, children}) => {
      let node = {
        key: labelId,
        value: labelId,
        title: labelName,
      }
      if (children) {
        node.children = this.changelabelTreeNodeName(children);
      }
      return node;
    })
    return nodes;
  }

  /**
   * 获取标签树节点map
   * @param list
   * @param parent
   * @returns {*}
   */
  getLabelTreeValueMap = (list, parent) => {
    return (list || []).map(({children, value}) => {
      const node = (this.labelTreeValueMap[value] = {
        value,
        parent
      })
      node.children = this.getLabelTreeValueMap(children, node)
      return node;
    })
  }

  /**
   * 递归获取所有标签子节点编号
   * @param value
   * @param childreValues
   * @returns {Array}
   */
  getAllLabelTreeChildrenIds = (value,childreValues = []) => {
    const childrenNodes = this.labelTreeValueMap[value].children;
    childrenNodes.forEach(({value}) => {
      childreValues.push(value);
      this.getAllLabelTreeChildrenIds(value,childreValues);
    });
    return childreValues;
  }

  /**
   * 递归获取所有父级节点编号
   * @param value
   * @param parentValues
   * @returns {Array}
   */
  getAllLabelTreeParentIds = (value,parentValues = []) => {
    const parentNode = this.labelTreeValueMap[value].parent;
    if (parentNode){
      const parentNodeValue = parentNode.value;
      parentValues.push(parentNodeValue)
      this.getAllLabelTreeParentIds(parentNodeValue,parentValues);
    }
    return parentValues;
  }

  /**
   * 递归获取取消选中的父级节点
   * @param curValue
   * @param parentValues
   * @returns {Array}
   */
  getNeedToUnSelectLabelTreeParentIds = (curValue,parentValues = []) => {
    const parentNode = this.labelTreeValueMap[curValue].parent;
    if (!parentNode){
      return parentValues;
    }
    const {labelTreeValue} = this.state;
    const parentValue = parentNode.value;
    const sameLevelNodes = parentNode.children;
    let isLoop = true;
    sameLevelNodes.forEach(({value}) => {
      if (value == curValue){
        return true;
      }
      if (labelTreeValue.indexOf(value) >= 0){
        isLoop = false;
      }
    })
    if (isLoop){
      parentValues.push(parentValue);
      this.getNeedToUnSelectLabelTreeParentIds(parentValue,parentValues);
    }
      return parentValues;
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
    let {projectUserList, projectRemoveUserIds} = this.state;
    if (projectRemoveUserIds.length > 0) {
      for (let i = 0; i < projectRemoveUserIds.length; i++) {
        projectUserList.splice(projectUserList.findIndex(item => item.userId == projectRemoveUserIds[i]), 1)
      }
    }
    this.setState({projectUserList: projectUserList, projectRemoveUserIds: []})

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
    const {selectedUserList, projectUserList} = this.state;
    let userList = [
      ...projectUserList,
      ...selectedUserList
    ]
    var hash = {}
    userList = userList.reduce(function (res, cur) {
      if (!hash[cur.userId]) {
        hash[cur.userId] = true;
        res.push(cur);
      }
      return res;
    }, []);
    this.setState({projectUserList: userList})
  }

  /***************  标签选择 ****************/
  onLabelTreeChange = (labelTreeValue, label, extra) => {
    console.log(labelTreeValue)
    this.setState({labelTreeValue: labelTreeValue})
    console.log(extra)
    const {triggerValue,selected} = extra;
    //选中时
    if (selected){
      //选中节点编号
      const addValues = [
        ...this.getAllLabelTreeParentIds(triggerValue),
        ...this.getAllLabelTreeChildrenIds(triggerValue)
      ]
      addValues.forEach((v) => {
        if (labelTreeValue.indexOf(v) == -1){
          labelTreeValue.push(v);
        }
      });
    }else {
      //取消节点
      const removeValues = [
        ...this.getAllLabelTreeChildrenIds(triggerValue),
        ...this.getNeedToUnSelectLabelTreeParentIds(triggerValue)
      ]
      removeValues.forEach((v) => {
        labelTreeValue.splice(labelTreeValue.findIndex(v1 => v1 == v),1)
      })
    }
    // console.log(this.state.labelTreeValue)
    // console.log(this.getAllLabelTreeChildrenIds(curValue))
    // console.log(this.getAllLabelTreeParentIds(curValue))
    // console.log(this.getNeedToUnSelectLabelTreeParentIds(triggerValue))
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

    {/*移出项目用户*/
    }
    const projectUserRowSelection = {
      selectedRowKeys: this.state.projectRemoveUserIds,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({projectRemoveUserIds: selectedRowKeys});
      }
    }

    {/*用户选择的列表设置*/
    }
    const userRowSelection = {
      selectedRowKeys: this.state.selectedUserIds,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedUserList: selectedRows, selectedUserIds: selectedRowKeys});
      }
    }

    return (
      <div>
        <div className={styles.addBtn}>
          <Button type="primary" onClick={this.showAddModal}>添加</Button>
        </div>
        <div>

          {/*项目表*/}
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
          labelTreeData={this.state.labelTreeData}
          labelTreeValue={this.state.labelTreeValue}
          onLabelTreeChange={this.onLabelTreeChange}
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
