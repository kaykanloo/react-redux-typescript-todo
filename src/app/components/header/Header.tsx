import React from 'react';

import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1>KayKanDo.js</h1>
            <h2 className={styles.noTopMargin}>A Simple Todo App Powered by React, Redux and TypeScript</h2>
        </header>
    )
}
