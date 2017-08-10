import React from 'react';
import DatePicker from './DatePicker';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import locale from 'rmc-date-picker/lib/locale/zh_CN';
import { formatFn, getProps as getDefaultProps } from './utils';

const noop = () => {};

const propTypes = {
  children: React.PropTypes.object.isRequired,
  popupPrefixCls: React.PropTypes.string,
  startDate: React.PropTypes.object,
  endDate: React.PropTypes.object,
  okText: React.PropTypes.string,
  dismissText: React.PropTypes.string,
  onOk: React.PropTypes.func,
};

const defaultProps = {
  popupPrefixCls: 'am-picker-popup',
  okText: '完成',
  dismissText: '取消',
  onOk: noop,
  ...getDefaultProps(),
};

class UCSDatePicker extends React.Component {
  render() {
    const {
      children,
      popupPrefixCls,
      defaultDate,
      defaultStartDate,
      defaultEndDate,
      startDate,
      endDate,
      value,
      extra,
      okText,
      dismissText,
      onOk,
    } = this.props;

    const datePicker = (
      <DatePicker
        locale={locale}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        startDate={startDate}
        endDate={endDate}
      />
    );

    return (
      <PopupDatePicker
        datePicker={datePicker}
        prefixCls={popupPrefixCls}
        WrapComponent="div"
        transitionName="am-slide-up"
        maskTransitionName="am-fade"
        triggerType="onClick"
        title=""
        date={value || defaultDate}
        dismissText={dismissText}
        okText={okText}
        onOk={onOk}
      >
        {children && React.cloneElement(children)}
      </PopupDatePicker>
    );
  }
}

UCSDatePicker.propTypes = propTypes;
UCSDatePicker.defaultProps = defaultProps;

export default UCSDatePicker;
