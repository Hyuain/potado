import React from 'react';
import {Dropdown, Menu, Icon} from 'antd';
import history from '../../config/history';
import axios from '../../config/axios';
import Todos from '../../components/Todos/Todos';
import './Home.less';

const onLogout = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = () => {
  return (
    <Menu>
      <Menu.Item key="1">
        <Icon type="user"/>
        个人设置
      </Menu.Item>
      <Menu.Item key="2" onClick={onLogout}>
        <Icon type="logout"/>
        注销
      </Menu.Item>
    </Menu>
  );
};

export default function () {
  const [user, setUser] = React.useState<any>({});

  React.useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const response = await axios.get('me');
      setUser(response.data);
    } catch (e) {
    }
  };

  return (
    <div id="home">
      <header>
        <span className="logo">LOGO</span>
        <Dropdown overlay={menu}>
          <div>
            <span>{user && user.account}</span> <Icon type="down"/>
          </div>
        </Dropdown>
      </header>
      <main>
        <Todos/>
      </main>
    </div>
  );
}