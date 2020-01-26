import React from 'react';
import history from '../../config/history';
import axios from '../../config/axios';

import {connect} from 'react-redux';
import actions from '../../redux/actions';

// import Todos from '../../components/Todos/Todos';
// import Tomatoes from '../../components/Tomatoes/Tomatoes';
import Statistics from '../../components/Statistics/Statistics';

import {Dropdown, Menu, Icon} from 'antd';
import './Home.less';

interface IHomeProps {
  initTodos: (payload: any)=>any,
  initTomatoes: (payload: any)=>any,
}

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

const Home = (props: IHomeProps) => {
  const [user, setUser] = React.useState<any>({});

  React.useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get('me');
        setUser(response.data);
      } catch (e) {
      }
    };
    const getTodos = async () => {
      try {
        const response = await axios.get('todos');
        const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
        props.initTodos(todos);
      } catch (e) {
      }
    };
    const getTomatoes = async () => {
      try {
        const response = await axios.get('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {
      }
    };
    getMe();
    getTodos();
    getTomatoes();
    // eslint-disable-next-line
  }, []);


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
        {/*<Tomatoes/>*/}
        {/*<Todos/>*/}
      </main>
      <Statistics/>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  initTodos: actions.initTodos,
  initTomatoes: actions.initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);