// components/Header.js
import Link from 'next/link';
import styles from '../pages/css/Header.module.css';

const Header = () => {
  return (
    
    <header className={styles.header}>
     
      <div>

        <nav>
          <ul>
            {/* <li className={styles.disable}>
              <Link href="/BasicInfo">Basic information management</Link>
            </li>
            <li className={styles.active}><Link href="/InvestmentType">Investment type management</Link></li>
            <li className={styles.disable}><Link href="/Check">Check deposit/withdrawal details</Link></li>
            <li className={styles.disable}><Link href="/SalesHistoryInquiry">Sales history inquiry</Link></li>
            <li className={styles.disable}><Link href="/InvestmentDetailsInquiry">Investment details inquiry</Link></li>
            <li className={styles.disable}><Link href="/ViewBondDetails">View bond details</Link></li>
            <li className={styles.disable}><Link href="/SMSManagement">SMS Management</Link></li>
            <li className={styles.disable}><Link href="/ConsultationHistory">Consultation history management</Link></li>
            <li className={styles.disable}><Link href="/InquiryHistory ">1:1 inquiry history inquiry</Link></li> */}


            <li className={styles.disable}>
              <Link href="">Basic information management</Link>
            </li>
            <li className={styles.active}><Link href="/InvestmentType">Investment type management</Link></li>
            <li className={styles.disable}><Link href="">Check deposit/withdrawal details</Link></li>
            <li className={styles.disable}><Link href="">Sales history inquiry</Link></li>
            <li className={styles.disable}><Link href="">Investment details inquiry</Link></li>
            <li className={styles.disable}><Link href="">View bond details</Link></li>
            <li className={styles.disable}><Link href="">SMS Management</Link></li>
            <li className={styles.disable}><Link href="">Consultation history management</Link></li>
            <li className={styles.disable}><Link href="">1:1 inquiry history inquiry</Link></li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
