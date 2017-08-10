import React from 'react';
import DatePick from 'rmc-date-picker';
import moment from 'moment';

import 'antd-mobile/lib/date-picker/style';
import styles from './DatePicker.css';

const FORMAT = 'YYYY-MM-DD';

const noop = () => {};

const propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  pickerPrefixCls: React.PropTypes.string,
  startDate: React.PropTypes.object,
  endDate: React.PropTypes.object,
  startMinDate: React.PropTypes.object,
  startMaxDate: React.PropTypes.object,
  endMinDate: React.PropTypes.object,
  endMaxDate: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  prefixCls: 'am-picker',
  pickerPrefixCls: 'am-picker-col',
  mode: 'date',
  startMaxDate: moment([2030, 11, 31, 0, 0, 0]).clone(),
  endMaxDate: moment([2030, 11, 31, 0, 0, 0]).clone(),
  startMinDate: moment([2017, 1, 1, 0, 0, 0]).clone(),
  endMinDate: moment([2017, 1, 1, 0, 0, 0]).clone(),
  onChange: noop,
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate || props.defaultStartDate,
      endDate: props.endDate || props.defaultEndDate,
    };
  }

  handleStartDateChange = (date) => {
    const { endDate } = this.state;
    this.setState({
      startDate: date,
      endDate: date.isAfter(endDate) ? date : endDate,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  getDefaultMinDate = () => {
    return !this.defaultMinDate ? moment([2017, 1, 1, 0, 0, 0]) : this.defaultMinDate;
  };

  getValue = () => {
    const startDate = this.state.startDate || this.getDefaultMinDate();
    const endDate = this.state.endDate || this.getDefaultMinDate();
    return { startDate, endDate };
  };

  render() {
    const {
      style,
      className,
      prefixCls,
      pickerPrefixCls,
      mode,
      locale,
      startMinDate,
      startMaxDate,
      endMinDate,
      endMaxDate,
      ...others,
    } = this.props;

    const { startDate, endDate } = this.state;

    return (
      <div
        style={style}
        className={`${className} ${styles.flex}`}
      >
        <div className={styles.title}>
          <p><span>开始日期：</span>{startDate.format(FORMAT)}</p>
          <p><span>结束日期：</span>{endDate.format(FORMAT)}</p>
        </div>
        <DatePick
          className={styles.item}
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          mode={mode}
          locale={locale}
          date={startDate}
          minDate={startMinDate}
          maxDate={startMaxDate}
          onDateChange={this.handleStartDateChange}
        />
        <DatePick
          className={styles.item}
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          mode={mode}
          locale={locale}
          date={endDate}
          minDate={this.state.startDate || endMinDate}
          maxDate={endMaxDate}
          onDateChange={this.handleEndDateChange}
        />
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
