import AutoLogout from '../components/AutoLogout';
import Avatar from '../components/avatar/AvatarDropdown';
import DateDisplay from '../components/DateDisplay';

import { Space } from 'antd';

import classes from '../components/avatar/AvatarDropdown.module.scss';

const HeaderContent = () => {
  return (
    <Space className={classes.headerContextBox}>
      <AutoLogout />
      <Avatar />
    </Space>
  );
};

export default HeaderContent;
