import moment from 'moment';
import { thousandsFormat } from '../../../lib/helper';

export const columns = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    hideInSearch: true,

  },
  {
    title: 'Charactor',
    key: 'charactor',
    dataIndex: 'charactor',
    hideInSearch: true,

  },

  {
    title: 'Amount',
    key: 'amounts',
    dataIndex: 'amounts',
    hideInSearch: true,
    render: (text) => [`$${thousandsFormat(text)}`],

  },

  {
    title: 'Operation',
    key: 'operationCode',
    dataIndex: 'zh_TW',
    hideInSearch: true,

  },

  {
    title: 'Target',
    key: 'target',
    dataIndex: 'target',
    hideInSearch: true,

  },

  {
    title: 'Time',
    key: 'created',
    dataIndex: 'created',
    sorter: (a, b) => {
      const aTime = new Date(a.created).getTime();
      const bTime = new Date(b.created).getTime();
      return aTime - bTime;
    },
    render: (e) => moment(e.props?.text).format('YYYY-MM-DD HH:mm:ss'),

  },

];

export default columns;
