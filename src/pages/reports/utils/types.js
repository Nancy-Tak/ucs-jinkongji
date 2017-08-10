import moment from 'moment';

const FORMAT = 'YYYY-MM-DD';

const now = moment();
const formatNow = now.format(FORMAT);

const lastDay = moment().subtract(1, 'd').format(FORMAT);
const weekAgo = moment().subtract(1, 'w').format(FORMAT);
const monthAgo = moment().subtract(1, 'M').format(FORMAT);

const today = {
  beginDate: formatNow,
  endDate: formatNow,
};

const yesterday = {
  beginDate: lastDay,
  endDate: lastDay,
};

const week = {
  beginDate: weekAgo,
  endDate: formatNow,
};

const month = {
  beginDate: monthAgo,
  endDate: formatNow,
};

export default {
  today,
  yesterday,
  week,
  month,
};
