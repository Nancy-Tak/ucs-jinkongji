import React from 'react';
import UCSCascader from '../Cascader';
import axios from '../../utils/axios';

const propTypes = {
  onChange: React.PropTypes.func,
};

const defaultTypes = {
  onChange: () => {},
};

class IndustrySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      industryList: [],
    }
  }

  componentDidMount() {
    this.getIndustryList().then(response => {
      this.setState({ industryList: response })
    }).catch(error => {
      console.log(error);
    })
  }

  getIndustryList = () => {
    return axios
      .get('/api/commondata/industrylist')
      .then(response => {
        const { data = [] } = response;
        return data.length ?
          data.map(item => ({ label: item.name, value: item.id })) : data;
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { industryList } = this.state;
    const { onChange } = this.props;
    return (
      <UCSCascader
        placeholder="请选择类别"
        options={industryList}
        onChange={onChange}
      />
    );
  }
}

IndustrySelect.propTypes = propTypes;
IndustrySelect.defaultTypes = defaultTypes;

export default IndustrySelect;
