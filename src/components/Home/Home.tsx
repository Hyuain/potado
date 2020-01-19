import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Home
      <Link to='/login'>
        <Button>登录</Button>
      </Link>
    </div>
  );
}