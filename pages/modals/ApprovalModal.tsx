import React, { useState } from 'react';
import Styles from "../css/InvestmentType.module.css";

const ApprovalModal = ({ checkedCount }: { checkedCount: number }, { data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleApproval = () => {
    // Logic for approval action
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Approval Modal</button>
      {isOpen && (
        <div className={Styles.modalmain}>
          <div className={Styles.modal}>
            <div>
              {/* Logo goes here */}
            </div>
            <div className={Styles.closebtn} onClick={handleCloseModal}>
              {/* Cross mark */}
            </div>
          </div>
          <div className={Styles.content}>
            testgdhjKSAShaskjmdcjkdxjk {/* Replace with your content */}
          </div>
          <div className={Styles.btns}>
            <button className={Styles.btn1} onClick={handleApproval}>Approve</button>
            <button className={Styles.btn2} onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalModal;
