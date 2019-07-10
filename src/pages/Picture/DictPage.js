import {PureComponent, Component} from 'react';
import {Table, Button, Modal, Form, Input, Radio, Row, Col, Select,Tabs} from 'antd';
import {connect} from 'dva';
import {Route,Link} from 'umi';
import DictType from './DictType';
import Dict from './Dict';

class DictPage extends PureComponent{

  //数据字典字段
  // columns = [
  //   {
  //     title: '类型编码',
  //     dataIndex: 'typeCode',
  //     key: 'typeCode',
  //   },
  //   {
  //     title: '类型名称',
  //     dataIndex: 'typeName',
  //   },
  //   {
  //     title: '备注',
  //     dataIndex: 'typeRemark',
  //   },
  //   {
  //     title: '排序',
  //     dataIndex: 'sortNo',
  //     sorter: true,
  //   },
  //   {
  //     title: '操作',
  //     render: (text, record) => (
  //       <span>
  //         <a href="#" onClick={() => this.handleLabelDetailFormOpen(record.labelId)}>修改</a> | <a href="#">删除</a>
  //       </span>
  //     ),
  //   },
  // ]

  state = {
    dict: <Dict/>,
    dictType: ''
  }


  handleDictTabsChange = (activeKey) =>{
    console.log(activeKey)
    if (activeKey == 'dict'){
      this.setState({dict: <Dict/>,dictType: ''})
    } else if (activeKey == 'dictType') {
      this.setState({dict: '',dictType: <DictType/>})
    }
  }

  render(){
    const { TabPane } = Tabs;
    return (
      <div>
        <Tabs defaultActiveKey="dict" onChange={this.handleDictTabsChange}>
          <TabPane tab="数据字典" key="dict">
            {this.state.dict}
          </TabPane>
          <TabPane tab="字典类型" key="dictType">
            {this.state.dictType}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default DictPage;
