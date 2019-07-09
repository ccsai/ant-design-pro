import {Modal, Form, Input, Radio, TreeSelect} from 'antd';
import {Component} from 'react';


class labelDetailFormModal extends Component {

  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      labelTreeSelectData,
      labelTreeValue,
      handleLabelTreeChange
    } = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title="标签表单"
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form layout="vertical">
          <Form.Item label="上级标签">
            {getFieldDecorator('pLabelId', {
              rules: [{required: true, message: '请选择上级标签！'}],
            })(
              <TreeSelect
                treeData={labelTreeSelectData}
                value={labelTreeValue}
                onChange={handleLabelTreeChange}
              />
            )}
          </Form.Item>
          <Form.Item label="标签名称">
            {getFieldDecorator('labelName', {
              rules: [{required: true, message: '请填写标签名称！'}],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator('sortNo')(<Input/>)}
          </Form.Item>
          <Form.Item label="显示">
            {getFieldDecorator('modifier', {
              initialValue: '1',
            })(
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(labelDetailFormModal);
