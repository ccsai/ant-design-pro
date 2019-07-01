import {Modal, Button, Table} from 'antd';
import {PureComponent} from 'react';


/**
 * 用户选择列表模态框
 */
class UserListTable extends PureComponent {

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
    }
  ];


  render() {
    const {dataSource,rowSelection} = this.props;

    return (
        <Table
          rowKey="userId"
          size="small"
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
          pagination={false}
          rowSelection={rowSelection}
        />
    );
  }
}

export default UserListTable;
