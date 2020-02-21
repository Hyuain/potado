import React from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '@/redux/actions';
import axios from '@/api/axios';
import Todos from '@/applications/Todos';
import Tomatoes from '@/applications/Tomatoes';
import Statistics from '@/applications/Statisitics';
import {Dropdown, Menu, Icon, message} from 'antd';
import './style.less';
import logo from '@/assets/images/logo.png';
import {Dispatch} from 'redux';
import {RootState} from '@/redux/reducers';

interface IHomeProps {
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Home = (props: ReduxType) => {
  const [user, setUser] = React.useState<User>({account: ''});
  let history = useHistory();

  React.useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get<User>('me');
        setUser(response.data);
      } catch (e) {
        if (e.response.status === 401) {
        } else {
          message.error('网络好像有点不太好哦，一会儿再试吧');
        }
      }
    };
    const getTodos = async () => {
      try {
        const response = await axios.get<TodoResponse>('todos');
        const todos = response.data.resources.map((todo) => Object.assign({}, todo, {editing: false}));
        props.initTodos(todos);
      } catch (e) {
        if (e.response.status === 401) {
        } else {
          message.error('网络好像有点不太好哦，一会儿再试吧');
        }
      }
    };
    const getTomatoes = async () => {
      try {
        const response = await axios.get<TomatoResponse>('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {
        if (e.response.status === 401) {
        } else {
          message.error('网络好像有点不太好哦，一会儿再试吧');
        }
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

const mapStateToProps = (state: RootState, ownProps: IHomeProps) => ({
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initTodos: actions.initTodos,
  initTomatoes: actions.initTomatoes
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);