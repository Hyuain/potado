import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '@/api/axios';
import {Input, Button, message} from 'antd';
import './style.less';

const Register = () => {
  const [account, setAccount] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirmation, setPasswordConfirmation] = React.useState();
  let history = useHistory();

  const onRegister = async () => {
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      history.push('/');
    } catch (e) {
      if (e.response.status === 422) {
        message.warning('用户已存在，请换一个用户名再尝试');
      } else {
        message.warning('网络错误，请稍后再试');
      }
    }
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (inputCheck()) {
        onRegister();
      }
    }
  };

  const onClick = () => {
    if (inputCheck()) {
      onRegister();
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
    if (passwordConfirmation !== password) {
      message.warning('两次输入的密码不一致，请重新输入');
      return false;
    }
    return true;
  };

  return (
    <div id="register">
      <h1>注册一个番茄账号</h1>
      <Input
        placeholder="请输入用户名"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input.Password
        placeholder="请输入密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input.Password
        placeholder="再输入一遍密码"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        onKeyUp={onKeyUp}
      />
      <Button
        type="primary"
        onClick={onClick}
      >注册</Button>
      <p>如果已经有账号了，请<Link to='/login'>点击这里登录</Link></p>
    </div>
  );
};

export default Register;