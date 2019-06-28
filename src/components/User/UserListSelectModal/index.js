import {Modal, Button, Table} from 'antd';
import {PureComponent} from 'react';


/**
 * 用户选择列表模态框
 */
class UserListSelectModal extends PureComponent {

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
    const {onOk, onCancel, visible} = this.props;

    return (
      <Modal
        title="用户选择"
        okText="确认选择"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}>
        <Table
          size="small"
          columns={this.columns}/>
      </Modal>
    );
  }
}

export default UserListSelectModal;
