import { Outlet } from 'react-router-dom';

import styles from './AdminLayout.module.css';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
