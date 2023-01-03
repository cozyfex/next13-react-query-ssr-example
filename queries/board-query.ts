import axios from 'axios';
import { ListInterface } from '../interfaces/listInterface';
import { BoardInterface } from '../interfaces/boardInterface';

const getBoard = (page: number = 1) =>
  axios.get(`/base-board/?page=${page}`)
       .then(res => res.data as ListInterface<BoardInterface[]>);

export { getBoard };
