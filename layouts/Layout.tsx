import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Head>
        <title>Next App Example</title>
        <meta name="description" content="Next App Example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <Link href="/">[Home]</Link>
          <Link href="/list">[None SSR]</Link>
          <Link href="/axios">[Axios SSR]</Link>
          <Link href="/axios-page">[Axios Query SSR]</Link>
          <Link href="/react-query">[Axios SSR]</Link>
          <Link href="/react-query-page">[Axios Query SSR]</Link>
          <Link href="/login">[Login Test]</Link>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        {children}

      </main>
    </div>
  );
};

export default Layout;
