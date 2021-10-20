import { Dropdown } from 'antd';
import classNames from 'classnames';
import classes from './HeaderDropdown.module.scss';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(classes.container, cls)} {...restProps} />
);

export default HeaderDropdown;
