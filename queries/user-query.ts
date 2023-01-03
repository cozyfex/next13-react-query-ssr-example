import { UserInterface } from '../interfaces/userInterface';
import axios from 'axios';
import { QueryResultInterface } from '../interfaces/queryResultInterface';
import { objectToCamel } from 'ts-case-convert';
import jwtDecode from 'jwt-decode';

const login = (credential: UserInterface): Promise<QueryResultInterface<UserInterface>> => {
  return axios.post('/login', credential).then(res => objectToCamel<QueryResultInterface<UserInterface>>(res.data));
};

const jwtLogin = (credential: UserInterface) => {
  return axios.post('/jwt-login', credential)
              .then(res => ({ data: objectToCamel<UserInterface>(jwtDecode(res.data.token)), token: res.data.token }));
};

export { login, jwtLogin };
