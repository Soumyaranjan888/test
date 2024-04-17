// components/Layout.js

import React, { ReactNode } from 'react'; // Import ReactNode type
import Header from './Header';
import Footer from './Footer';
import styles from '../pages/css/Header.module.css';
interface LayoutProps {
    children: ReactNode; // Define children prop type explicitly as ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className={styles.memberdetails}>Member Details</div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
