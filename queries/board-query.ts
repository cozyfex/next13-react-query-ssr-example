import axios from 'axios';
import { ListInterface } from '../interfaces/listInterface';
import { BoardInterface } from '../interfaces/boardInterface';

const getBoard = (page: number = 1) => axios.get(`/base-board/?page=${page}`, {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
}).then(res => res.data as ListInterface<BoardInterface[]>);

export { getBoard };
