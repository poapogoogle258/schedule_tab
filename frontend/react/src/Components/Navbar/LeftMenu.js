import React from 'react';
import { Menu, Grid } from 'antd';
import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

const LeftMenu = () => {
  const { md } = useBreakpoint()
  return (
    <Menu mode={md ? "horizontal" : "inline"} disabledOverflow={true}>
      <Menu.Item key="calendar">
        <Link to="/">
          <a href="">ตารางเวร</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="schedule">
        <Link to='/manager'>
          <a href="">การจัดเวร</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="members">
        <Link to='/members'>
          <a href="">สมาชิก</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="leave">
        <a href="">รายงานเวร</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
