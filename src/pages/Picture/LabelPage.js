import {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select} from 'antd';
import {connect} from 'dva';
import LabelDetailFormModal from '@/components/Label/LabelDetailFormModal';


@connect(({label, loading}) => ({
  label,
  loading: loading.models.label
}))
class LabelPage extends PureComponent {

  state = {
    detailModalVisible: false,//标签详情表单显示
    modifyLabelId: null,//修改标签编号
    labelTreeSelectData: [],//上级标签选项
    labelTreeValue: '',//上级标签下拉框值
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'labelId',
      key: 'labelId',
    },
    {
      title: '标签名称',
      dataIndex: 'labelName',
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
      title: '显示',
      dataIndex: 'isShow',
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <a href="#" onClick={() => this.handleLabelDetailFormOpen(record.labelId)}>修改</a> | <a href="#">删除</a>
        </span>
      ),
    },
  ]


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'label/findLabelTreeTable',
    });
  }

  /**
   * 分页
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange = (pagination, filters, sorter) => {
    const {searchValues} = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchValues
    }

    const {dispatch} = this.props;
    dispatch({
      type: 'label/findLabelTreeTable',
      payload: params
    });
  }

  //显示详情表单
  handleLabelDetailFormOpen = (modifyLabelId) => {
    const {form} = this.labelDetailFormRef.props;
    form.resetFields();
    this.setState({detailModalVisible:  true,modifyLabelId: modifyLabelId})
    //上级标签下拉框选项加载
    const {dispatch} = this.props;
    dispatch({
      type: 'label/findTree',
      callback: res => {
        let labelTreeSelectData = this.changelabelTreeNodeName(res)
        labelTreeSelectData = [{
          key: 'root',
          value: 'root',
          title: '一级标签',
          children: labelTreeSelectData
        }]
        this.setState({labelTreeSelectData: labelTreeSelectData});

        //修改标签展示详情
        if (modifyLabelId) {
          dispatch({
            type: 'label/findLabelDetail',
            payload: {labelId: modifyLabelId},
            callback: res1 => {
              console.log(res1)
              const {form} = this.labelDetailFormRef.props;
              form.setFieldsValue(res1);
            }
          })
        }
      }
    })


  }

  /**
   * 递归修改标签树属性名
   * @param list
   * @returns {*}
   */
  changelabelTreeNodeName = (list) => {
    const nodes = list.map(({labelId, labelName, children}) => {
      const node = {
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

  //关闭详情表单
  handleLabelFormModalCancel = () => {
    this.setState({detailModalVisible: false})
  }

  //提交详情表单
  handleLabelFormSubmit = () => {
      const {form} = this.labelDetailFormRef.props;
      form.validateFields((err,values) => {
        if (err){
          return;
        }
        const {dispatch} = this.props;
        const {modifyLabelId} = this.state;
        let url;
        if (modifyLabelId){
          url = 'label/modifyLabel';
        } else {
          url = 'label/addLabel';
          console.log(121)
        }
        dispatch({
          type: url,
          payload: values,
          callback: res => {
            console.log(res)
            dispatch({
              type: 'label/findLabelTreeTable'
            })
            this.setState({detailModalVisible: false});
          }
        })
      })
  }

  render() {
    const {label, loading} = this.props;
    const {total, list} = label.data;
    const paginationProps = {
      total: total,
      pageSizeOptions: ['2', '5', '10', '50'],
      pageSize: 2,
      showTotal: total => total,
    }

    return (
      <div>
        <div style={{marginBottom: '10px'}}>
          <Button type="primary" onClick={() => this.handleLabelDetailFormOpen(null)}>
            添加
          </Button>
        </div>

        {/*标签表*/}
        <div>
          <Table
            columns={this.columns}
            dataSource={list}
            rowKey="labelId"
            pagination={paginationProps}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>

        {/*标签详情表单*/}
        <LabelDetailFormModal
          visible={this.state.detailModalVisible}
          onCancel={this.handleLabelFormModalCancel}
          onOk={this.handleLabelFormSubmit}
          wrappedComponentRef={formRef => this.labelDetailFormRef = formRef}
          labelTreeSelectData={this.state.labelTreeSelectData}
          labelTreeValue={this.state.labelTreeValue}
          onChange={(value) => this.setState({labelTreeValue: value})}
        />
      </div>
    );
  }
}

export default LabelPage;
