import { useQuery } from 'react-query';
import { useState } from 'react';
import Layout from '../layouts/Layout';
import dayjs from 'dayjs';
import Link from 'next/link';
import { getBoard } from '../queries/board-query';

const Index = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(['list', page], () => getBoard(page));

  return (
    <Layout>
      SSR Example
    </Layout>
  );
};

export default Index;
