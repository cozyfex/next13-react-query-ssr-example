import { useQuery } from 'react-query';
import { useState } from 'react';
import Layout from '../layouts/Layout';
import dayjs from 'dayjs';
import Link from 'next/link';
import { getBoard } from '../queries/board-query';

const List = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(['list', page], () => getBoard(page));

  return (
    <Layout>
      None SSR List Example with React Query
      <table width="70%" style={{ textAlign: 'center' }} border={1}>
        <colgroup>
          <col width="10%"/>
          <col width="20%"/>
          <col width="10%"/>
          <col width="*"/>
          <col width="15%"/>
        </colgroup>
        <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Name</th>
          <th>Content</th>
          <th>Reg Date</th>
        </tr>
        </thead>
        <tbody>
        {data?.results.map(item =>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.name}</td>
            <td>{item.content}</td>
            <td>{dayjs(item.reg_date).format('YYYY-MM-DD hh:mm:ss')}</td>
          </tr>,
        )}
        </tbody>
      </table>

      <ul style={{ listStyle: 'none' }}>
        {[...Array(Math.ceil((data?.count || 10) / 10)).keys()].map((_, i) =>
          <li key={i + 1} onClick={() => setPage(i + 1)} style={{ float: 'left', cursor: 'pointer', padding: '4px' }}>
            {i + 1}
          </li>,
        )}
      </ul>
    </Layout>
  );
};

export default List;
