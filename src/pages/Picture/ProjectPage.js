import React, {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select} from 'antd';
import {connect} from 'dva';

import styles from './ProjectPage.less';

/**
 * 项目列表
 */
class ProjectTreeTable extends PureComponent {
  render() {
    const {columns, rows, loading, rowKey, paginationProps} = this.props;
    // console.log(data)
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
      const {form, visible, onCancel} = this.props;
      const {getFieldDecorator} = form;
      const { TextArea } = Input;
      return (
        <Modal
          visible={visible}
          title="项目表单"
          okText="保存"
          onCancel={onCancel}
          // onOk={onCreate}
        >
          <Form layout="vertical">
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
              {getFieldDecorator('projectStatus',{initialValue: "1",})(
                <Select
                  showSearch
                >
                  <Select.Option value="1" >有效</Select.Option>
                  <Select.Option value="0">无效</Select.Option>
                </Select>)}
            </Form.Item>
            <Form.Item label="关键字">
              {getFieldDecorator('keywords')(<Input/>)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('projectDesc')(<TextArea
                autosize={{ minRows: 2, maxRows: 6 }}
              />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

@connect(({project, loading}) => ({
  project,
  loading: loading.models.project,
}))
class ProjectPage extends PureComponent {

  state = {
    paginationProps: {},
    addFormVisible: false
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

  openAddFormModal = () => {
    this.setState({addFormVisible: true})
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
        <AddForm
          visible={this.state.addFormVisible}
          wrappedComponentRef={this.getAddFormRef}
          onCancel={this.closeAddFormModal}
          onOk={this.openAddFormModal}/>
      </div>
    )
  }
}

export default ProjectPage;
