import {
  AGENT_URL,
  ONLINE_EGM_LIST,
} from '../utils';

import { isEmptyObj } from '../../helper';

import store from '../../../store/store';

import { setShowLiveEgmStatus } from '../../../store/actions/showLiveActions';

export const getOnlineEgmList = async () => {
  const url = `${AGENT_URL}${ONLINE_EGM_LIST}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'fetch egm list error');

    if (data.status !== 200) throw new Error(data.message || 'fetch egm list error');

    const filterData = data.result.filter((el) => el.stream_url
      && !isEmptyObj(el.member));

    const formatData = filterData.map((el) => ({
      ip: el.ip,
      member: el.member,
      brand: el.brand_name,
      name: el.name,
      stream: el.stream_url,
    }));

    store.dispatch(setShowLiveEgmStatus(formatData));

    return formatData;
  } catch (error) {
    return error;
  }
};

export const temp = () => { };
