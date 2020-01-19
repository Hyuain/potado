import React from 'react';
import {Button} from 'antd';
import {useHistory} from 'react-router-dom';
import axios from '../../config/axios';

export default function () {
  const [user, setUser] = React.useState<any>({});
  let history = useHistory();

  React.useEffect(() => {
    const getHome = async () => {
      await getMe();
    };
    getHome();
  });

  const getMe = async () => {
    try {
      const response = await axios.get('me');
      setUser(response.data);
    } catch (e) {
    }
  };

  const onLogout = () => {
    localStorage.setItem('x-token', '');
    history.push('/login');
  };

  return (
    <div>
      Home
      欢迎，{user.account}
      <Button onClick={onLogout}>注销</Button>
    </div>
  );
}