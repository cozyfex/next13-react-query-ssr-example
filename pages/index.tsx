import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { ListInterface } from '../interfaces/listInterface';
import { BoardInterface } from '../interfaces/boardInterface';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getBoard } from '../queries/board-query';
import Layout from '../layouts/Layout';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params, context.query);
  const page = parseInt(context.query.page as string || '1');
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['list'], () => getBoard(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home () {
  const [page, setPage] = useState(1);
  const { data } = useQuery(['list'], () => getBoard(page));

  return (
    <Layout>
      Server Side Rendering List Example with React Query
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
            <Link href={`/?page=${i + 1}`}>
              {i + 1}
            </Link>
          </li>,
        )}
      </ul>
    </Layout>
  );
}
