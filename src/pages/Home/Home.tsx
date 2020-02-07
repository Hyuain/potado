import React from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import axios from '../../config/axios';

import Todos from '../../components/Todos/Todos';
import Tomatoes from '../../components/Tomatoes/Tomatoes';
import Statistics from '../../components/Statistics/Statistics';

import {Dropdown, Menu, Icon, message} from 'antd';
import './Home.less';
import logo from '../../assets/images/logo.png'

interface IHomeProps {
  initTodos: (payload: any) => {
    type: string,
    payload: any
  },
  initTomatoes: (payload: any) => {
    type: string,
    payload: any
  },
}

const Home = (props: IHomeProps) => {
  const [user, setUser] = React.useState<any>({});
  let history = useHistory();

  React.useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get('me');
        setUser(response.data);
      } catch (e) {
        message.error('网络好像有点不太好哦，一会儿再试吧');
      }
    };
    const getTodos = async () => {
      try {
        const response = await axios.get('todos');
        const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
        props.initTodos(todos);
      } catch (e) {
        message.error('网络好像有点不太好哦，一会儿再试吧');
      }
    };
    const getTomatoes = async () => {
      try {
        const response = await axios.get('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {
        message.error('网络好像有点不太好哦，一会儿再试吧');
      }
    };
    getMe();
    getTodos();
    getTomatoes();
  }, [props]);

  const onLogout = () => {
    localStorage.setItem('x-token', '');
    history.push('/login');
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={onLogout}>
          <Icon type="logout"/>
          注销
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div id="home">
      <header>
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <Dropdown overlay={menu}>
          <div>
            <span className="user">{user && user.account}</span> <Icon type="down"/>
          </div>
        </Dropdown>
      </header>
      <main>
        <Tomatoes/>
        <Todos/>
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