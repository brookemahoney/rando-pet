import styles from './index.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 id="site-title">
      <div className={styles.logo}>
        <img src="/images/cat-of-the-day-logo.png" alt="logo" />
      </div>
      Cat Of The Day
    </h1>
  </header>
);

export default Header;