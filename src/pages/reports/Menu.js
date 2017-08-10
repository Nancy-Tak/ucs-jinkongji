import React from 'react';
import { Link, withRouter } from 'react-router';
import UCSDatePicker from '../../components/DatePicker';
import moment from 'moment';

import styles from './Menu.css';

const FORMAT = 'YYYY-MM-DD';

const propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  location: React.PropTypes.object.isRequired,
};

const defaultProps = {
  className: styles.root,
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { beginDate: null, endDate: null };
  }

  handleOnOk = (value) => {
    const { router } = this.props;
    const { beginDate, endDate } = value;
    this.setState({ beginDate, endDate });
    router.push({
      pathname: '/reports',
      query: {
        type: 'more',
        beginDate: value.startDate.format(FORMAT),
        endDate: value.endDate.format(FORMAT),
      },
    });
  };

  render() {
    const { className, location } = this.props;
    const beginDate = location.query.beginDate || '';
    const endDate = location.query.endDate || '';

    return (
      <nav className={className}>
        <Link
          className={styles.link}
          activeClassName="active"
          to={`/reports?type=today`}
        >
          <span>今天</span>
        </Link>
        <Link
          className={styles.link}
          activeClassName="active"
          to={`/reports?type=yesterday`}
        >
          <span>昨天</span>
        </Link>
        <Link
          className={styles.link}
          activeClassName="active"
          to={`/reports?type=week`}
        >
          <span>最近七天</span>
        </Link>
        <Link
          className={styles.link}
          activeClassName="active"
          to={`/reports?type=month`}
        >
          <span>最近三十天</span>
        </Link>
        <Link
          className={styles.link}
          activeClassName="active"
          to={`/reports?type=more&beginDate=${beginDate}&endDate=${endDate}`}
        >
          <UCSDatePicker
            defaultStartDate={beginDate && moment(beginDate) || moment().clone()}
            defaultEndDate={ endDate && moment(endDate) || moment().clone()}
            startDate={beginDate && moment(beginDate) || null}
            endDate={endDate && moment(endDate) || null}
            onOk={this.handleOnOk}
          >
            {
              beginDate && endDate ?
              <span styleName="time-box">{`${beginDate} - ${endDate}`}</span> :
              <span styleName="date-picker">更多筛选</span>
            }
          </UCSDatePicker>
        </Link>
      </nav>
    );
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default withRouter(Menu);
