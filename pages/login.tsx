import Layout from '../layouts/Layout';
import InputElement from '../components/elements/InputElement';
import { jwtLogin, login } from '../queries/user-query';
import { useState } from 'react';
import { UserInterface } from '../interfaces/userInterface';
import jwtDecode from 'jwt-decode';
import { objectToCamel } from 'ts-case-convert';
import axios from 'axios';
import { ListInterface } from '../interfaces/listInterface';
import { BoardInterface } from '../interfaces/boardInterface';

const Login = () => {
  const [state, setState] = useState<UserInterface[]>([]);
  const handleLogin = async () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const res = await login({ username: username.value, password: password.value });
    if (res.result) {
      setState([...state, res.data]);
    } else {
      setState([...state, {
        username: 'error',
        fullName: 'error',
      }]);
    }
  };

  const handleLoginJwt = async () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const res = await jwtLogin({ username: username.value, password: password.value });
    if (res) {
      setState([...state, { username: res.data.username, fullName: res.data.fullName }]);
      const data = axios.get(`/base-board/?page=1`, {
        headers: {
          Authorization: `JWT ${res.token}`,
        },
      }).then(res => res.data as ListInterface<BoardInterface[]>);
    } else {
      setState([...state, {
        username: 'error',
        fullName: 'error',
      }]);
    }
  };

  return (
    <Layout>
      <div style={{ display: 'block' }}>
        <label>Username</label>
        <div>
          <InputElement id="username" value={process.env.NEXT_PUBLIC_LOGIN_USERNAME}/>
        </div>
        <label>Password</label>
        <div>
          <InputElement id="password" value={process.env.NEXT_PUBLIC_LOGIN_PASSWORD}/>
        </div>
        <button type="button" style={{ width: '50px', height: '30px' }} onClick={handleLogin}>Login</button>
        <button type="button" style={{ width: '100px', height: '30px' }} onClick={handleLoginJwt}>Login Jwt</button>
        {state.map((item, index) => <div key={index}>{item.username} - {item.fullName}</div>)}
      </div>
    </Layout>
  );
};

export default Login;
