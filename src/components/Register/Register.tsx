import React from 'react';
import {Input, Button} from 'antd';
import axios from '../../config/axios';
import {Link, useHistory} from 'react-router-dom';
import './Register.less';

export default function () {
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
      throw new Error(e);
    }
  };

  return (
    <div id="register">
      <h1>登录我的番茄闹钟</h1>
      <Input
        placeholder="Username"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input.Password
        placeholder="input password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input.Password
        placeholder="confirm password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button
        type="primary"
        onClick={onRegister}
      >注册</Button>
      <p>如果已经有账号了，请<Link to='/login'>点击这里登录</Link></p>
    </div>
  );
}