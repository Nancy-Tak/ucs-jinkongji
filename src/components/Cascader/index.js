import React from 'react';
import Cascader from 'rc-cascader';
import { InputItem } from 'antd-mobile';

import './index.less';

const noop = () => {};

const propTypes = {
  children: React.PropTypes.any,
  inputClassName: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  popupClassName: React.PropTypes.string,
  dropdownMenuColumnStyle: React.PropTypes.object,
  options: React.PropTypes.array,
  defaultValue: React.PropTypes.array,
  value: React.PropTypes.array,
  expandTrigger: React.PropTypes.bool,
  changeOnSelect: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  loadData: React.PropTypes.func,
};

const defaultProps = {
  inputClassName: 'ucs-input',
};

class UCSCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (value, selectedOptions) => {
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(', '),
    });
    this.props.onChange(value, selectedOptions);
  };

  render() {
    const { inputValue } = this.state;
    const {
      children,
      inputClassName,
      placeholder,
      ...others
    } = this.props;

    const input = children || (
      <InputItem
        className={inputClassName}
        placeholder={placeholder}
        editable={false}
        value={inputValue}
      />
    );

    return (
      <Cascader
        { ...others }
        onChange={this.handleInputChange}
      >
        { input }
      </Cascader>
    );
  }
}

UCSCascader.propTypes = propTypes;
UCSCascader.defaultProps = defaultProps;

export default UCSCascader;
