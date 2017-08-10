import types from './types';

const TYPES = ['today', 'yesterday', 'week', 'month', 'more'];

const parseQuery = (query) => {
  if (!~TYPES.indexOf(query.type)) {
    return types.today;
  }

  const params = query.type === 'more' ?
    { beginDate: query.beginDate, endDate: query.endDate} :
    { ...types[query.type] };

  return params;
};

export default parseQuery;
