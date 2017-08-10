import React from 'react';
import UCSCascader from '../Cascader';
import axios from '../../utils/axios';

const propTypes = {
  onChange: React.PropTypes.func,
};

const defaultTypes = {
  onChange: () => {},
};

class AreaSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [{
        label: '全部区域',
        value: '',
      }],
    }
  }

  componentDidMount() {
    const { area } = this.state;
    this.getAreaByCode('', false).then(response => {
      this.setState({ area: [...area, ...response] })
    }).catch(error => {
      console.log(error);
    })
  }

  getAreaByCode = (code = '', isLeaf) => {
    return axios
      .get(`/api/area/arealist?code=${code}`)
      .then(response => {
        const { data = [] } = response;
        return data.length ?
          data.map(item => ({
            label: item.areaName,
            value: item.areaCode,
            isLeaf,
          })) : data;
      })
      .catch(error => {
        throw error;
      });
  };

  handleLoadData = (selectedOptions) => {
    const optionsLength = selectedOptions.length;
    const isLeaf = optionsLength === 2;
    const targetOption = selectedOptions[optionsLength - 1];

    this.getAreaByCode(targetOption.value, isLeaf)
      .then(response => {
        if (!response.length) return;
        targetOption.children = response;
        this.setState({ area: [...this.state.area] });
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { area } = this.state;
    const { onChange } = this.props;
    return (
      <UCSCascader
        placeholder="选择地区"
        changeOnSelect
        options={area}
        loadData={this.handleLoadData}
        onChange={onChange}
      />
    );
  }
}

AreaSelect.propTypes = propTypes;
AreaSelect.defaultTypes = defaultTypes;

export default AreaSelect;
