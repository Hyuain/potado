import React from 'react';
import {Input, Button, message} from 'antd';
import axios from '@/api/axios';
import {Link, useHistory} from 'react-router-dom';
import './style.less';

const Login = () => {
  const [account, setAccount] = React.useState();
  const [password, setPassword] = React.useState();
  let history = useHistory();

  const onLogin = async () => {
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      });
      history.push('/');
    } catch (e) {
      if (e.response.status === 422) {
        message.warning('用户名或密码错误，请重新输入');
      } else {
        message.error('网络好像有点不太好哦，一会儿再试吧');
      }
    }
  };

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (inputCheck()) {
        onLogin();
      }
    }
  };

  const onClick = () => {
    if (inputCheck()) {
      onLogin();
    }
  };

  const inputCheck = () => {
    if (account === '') {
      message.warning('用户名不能为空哦');
      return false;
    }
    if (password === '') {
      message.warning('密码不能为空哦');
      return false;
    }
    return true;
  };

  return (
    <div id="login">
      <h1>欢迎登录番茄闹钟</h1>
      <Input
        placeholder="请输入用户名"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input.Password
        placeholder="请输入密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={onKeyUp}
      />
      <Button
        type="primary"
        onClick={onClick}
      >登录</Button>
      <p>如果还没有账号，请<Link to='/register'>点击这里注册</Link></p>
    </div>
  );
};

export default Login;