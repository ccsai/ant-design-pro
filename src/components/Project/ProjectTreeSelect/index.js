import { TreeSelect } from 'antd';
import {Component} from 'react';


class ProjectTreeSelect extends Component {

  render() {
    const {projectTreeSelectData,projectTreeSelectValue,onChange} = this.props;

    return (
      <TreeSelect
        value={projectTreeSelectValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={projectTreeSelectData}
        placeholder="请选择上级项目！"
        // treeDefaultExpandAll
        onChange={onChange}
      />
    );
  }
}

export default ProjectTreeSelect;
