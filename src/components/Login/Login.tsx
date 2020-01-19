import React from 'react';
import {Input, Button} from 'antd';
import axios from '../../config/axios';
import {Link, useHistory} from 'react-router-dom';
import './Login.less';

export default function () {
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
      <Button
        type="primary"
        onClick={onLogin}
      >登录</Button>
      <p>如果还没有账号，请<Link to='/register'>点击这里注册</Link></p>
    </div>
  );
}