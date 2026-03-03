import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';

interface NavItem {
  readonly label: string;
  readonly to: string;
  readonly icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: '⊞' },
  { label: 'Users', to: '/users', icon: '👥' },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⬡</span>
        <span className={styles.logoText}>Enterprise</span>
      </div>
      <nav>
        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
                }
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
