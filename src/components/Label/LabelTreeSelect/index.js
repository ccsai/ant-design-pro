import { TreeSelect } from 'antd';
import {Component} from 'react';


const { SHOW_PARENT } = TreeSelect;

// const treeData = [
//   {
//     title: 'Node1',
//     value: '0-0',
//     key: '0-0',
//     children: [
//       {
//         title: 'Child Node1',
//         value: '0-0-0',
//         key: '0-0-0',
//       },
//     ],
//   },
//   {
//     title: 'Node2',
//     value: '0-1',
//     key: '0-1',
//     children: [
//       {
//         title: 'Child Node3',
//         value: '0-1-0',
//         key: '0-1-0',
//       },
//       {
//         title: 'Child Node4',
//         value: '0-1-1',
//         key: '0-1-1',
//       },
//       {
//         title: 'Child Node5',
//         value: '0-1-2',
//         key: '0-1-2',
//       },
//     ],
//   },
// ];

class LabelTreeSelect extends Component {
  // state = {
  //   value: ['0-0-0'],
  // };

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    const {treeData,labelTreeValue} = this.props;

    const tProps = {
      treeData,
      value: labelTreeValue,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择标签...',
    };
    return <TreeSelect {...tProps} />;
  }
}

export default LabelTreeSelect;
