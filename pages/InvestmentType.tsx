import React, { useState } from 'react';
import Styles from "./css/InvestmentType.module.css";
import ApprovalStyles from "./css/ApprovalModal.module.css";
import InvestmentTypejson from "./json/InvestmentTypejson.json";
import ApprovalModal from './modals/ApprovalModal';
// import closeIcon from '../public/xclose.svg';
// import explanationIcon from '../public/xclose.svg';
import saveIcon from '@/public/mustfintech.jpg';
const InvestmentType = () => {


    const waitingApproval = InvestmentTypejson.filter(el => el.approval.toLowerCase() == "waiting for approval")?.length;
    const totalPeople = InvestmentTypejson.length;
    const [checkedCount, setCheckedCount] = useState(0);
    const [approvedCheck, setApprovedCheck] = useState(false);
    const [rejectCheck, setRejectCheck] = useState(false);
    const [lookOpen, setLookOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [requiredCheck, setRequiredCheck] = useState(false);
    const [fileTypeCheck, setFileTypeCheck] = useState(false);
    const [maxImageCheck, setMaxImageCheck] = useState(false);
    const [imageSizeCheck, setImageSizeCheck] = useState(false);
    const [fileRegistrationFail, setFileRegistarionFail] = useState(false);
    const [fileRegistrationConfirmation, setFileRegistrationConfirmation] = useState(false);
    const [addInvestmentType, setAddInvestmentType] = useState(false);
    // Function to handle checkbox click event
    const lookModalHandle = (data: any) => {
        setLookOpen(data);
    }
    const addModalHandle = (data: any) => {
        setAddOpen(data);

    }

    const handleCheckboxClick = (event: any, data: any) => {
        setApprovedCheck(false);
        setRejectCheck(false);
        console.log("data", data)
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        let count = 0;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                count++;
            }
        });
        setCheckedCount(count);
        closeModal();

        if (data?.approval.toLowerCase() == "approved") {
            setApprovedCheck(true)
        }
        else if (data?.approval.toLowerCase() == "approval denied") {
            setRejectCheck(true);
        }

    };



    const itemsPerPage = 5; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [statusChangeModalOpen, setStatusChangeModalOpen] = useState(false);

    const openModal = (data: any) => {

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openStatusChangeModal = (data: any) => {

        setStatusChangeModalOpen(data);
        if (approvalStatusData.reason === false) {

            setRequiredCheck(data)
        }
    };


    const [formData, setFormData] = useState({
        membership: '',
        member: '',
        investment: '1',
        documents: null
    });


    const [approvalStatusData, setApprovalStatusData] = useState({
        membership: '',
        member: '',
        reason: false,
        textarea: ''

    });

    // Function to handle form submission
    const handleSubmit = (data: any) => {
        // Check if required fields are filled
        if (formData.investment === '' || formData.documents === null) {

            setRequiredCheck(data)
        }
        else if (!fileTypeCheck || !imageSizeCheck || !maxImageCheck || !fileRegistrationFail) {
            setFileRegistrationConfirmation(true);
        }

        // Proceed ;with form submission if all required fields are filled
        // Your form submission logic here
    };
    const modalCloseForAddPopup = (data: any, type: any) => {
        if (type != 'sucess') {
            setRequiredCheck(data);
            setMaxImageCheck(data);
            setFileTypeCheck(data);
            setImageSizeCheck(data);
            setFileRegistarionFail(data);
            setFileRegistrationConfirmation(data);
            setAddInvestmentType(data);
        }
        else {
            setFileRegistrationConfirmation(false);
            setAddInvestmentType(data);
        }

    }
    // Function to update form data
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeForApprovalStatus = (e: any) => {
        const { name, checked } = e.target; // Destructure name and checked properties
        setApprovalStatusData({
            ...approvalStatusData,
            [name]: checked
        });
    };

    // Function to handle file input change
    const handleFileChange = (e: any) => {
        const selectedFiles = e.target.files;

        let isValid = true;

        // Check if number of files exceeds 10
        if (selectedFiles.length == 0 || !selectedFiles || selectedFiles == undefined) {
            setFileRegistarionFail(true);
            isValid = false;
        }
        if (selectedFiles.length > 10) {
            setMaxImageCheck(true);
            isValid = false;
        }
        if (selectedFiles.length <= 10) {
            // Check file types and sizes
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const fileType = file.type.split('/')[1]; // Get the file extension
                const fileSize = file.size; // Get the file size in bytes

                // Check if file type is allowed (jpg, jpeg, gif, or pdf)
                if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'gif' && fileType !== 'pdf' && fileType !== 'png') {
                    setFileTypeCheck(true)
                    isValid = false;
                    break; // Exit loop if an invalid file type is found
                }

                // Check if file size exceeds 100 MB (100 * 1024 * 1024 bytes)
                if (fileSize > 100 * 1024 * 1024) {
                    setImageSizeCheck(true);
                    isValid = false;
                    break; // Exit loop if a file size exceeds the limit
                }
            }
        }

        // Update form data only if all files are valid
        if (isValid) {
            setFormData({
                ...formData,
                documents: selectedFiles
            });
        } else {
            // Clear the file input
            e.target.value = null;
        }
    };


    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = InvestmentTypejson.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

    return (
        <>

            <div className={Styles.header}>
                <label className={Styles.label}><b>Application List</b></label>&nbsp;&nbsp;
                <label className={Styles.labelSecond}>(Total {totalPeople} people | <span className={Styles.highlight}>{waitingApproval}</span> case waiting for approval)</label>
                {/* onChange={handleApprovalChange(1) */}
                <div className={Styles['drop-down-main']} >
                    <select className={Styles.dropdown}>
                        <option value="1">Approval All</option>
                        <option value="2">Waiting for approval</option>
                        <option value="3">Approved</option>
                        <option value="4">Approved denied</option>
                    </select>
                    <select className={Styles.dropdown}>
                        <option value="1">In order of application date and time</option>
                        <option value="2">Approval date and time</option>
                        <option value="3">Sorted by date of registaration</option>
                    </select>
                    <select className={Styles.dropdown}>
                        <option value="1">View 50 each</option>
                        <option value="2">View 10 each</option>
                    </select>
                    <button className={Styles.excel}>excel download</button>
                </div>
            </div>

            <hr />
            <div className={Styles.header}>
                <button className={Styles.registration} onClick={() => addModalHandle(true)}>Registration</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className={Styles['drop-down-main']}>
                    <label>{checkedCount} items selected</label>
                    <select className={Styles.dropdown}>
                        <option value="" disabled selected>Change approval status</option>
                        <option value="1">Approved</option>
                        <option value="2">Approved denied</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className={Styles.registration} onClick={() => openModal(true)}> Save</button>
                </div>
            </div >

            <table className={`${Styles["payment-procedure-table"]}`}>
                <thead>
                    <tr className={Styles["table_header"]}>
                        <th scope="col"></th>
                        <th scope="col">NO</th>
                        <th scope="col">EXISTING TYPE</th>
                        <th scope="col">APPLICATION TYPE</th>
                        <th scope="col">DOCUMENTS TO BE SUBMITTED</th>
                        <th scope="col">APPLICATION DATE AND TIME</th>
                        <th scope="col">APPROVAL</th>
                        <th scope="col">REASON FOR REJECTION OF APPROVAL</th>
                        <th scope="col">APPROVAL DATE AND TIME</th>
                        <th scope="col">MANAGER</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((data, index) => {
                        const serialNumber = indexOfFirstItem + index + 1;
                        return (
                            <tr key={index}>
                                <td>
                                    {/* checked={data.check} readOnly  */}
                                    <input type="checkbox" onClick={(event) => handleCheckboxClick(event, data)} />
                                </td>
                                <td>{serialNumber}</td>
                                <td>{data.existingType}</td>
                                <td>{data.applicationType}</td>
                                <td>
                                    <button className={Styles["look-btn"]} onClick={() => lookModalHandle(true)} >
                                        {data.documentToBeSubmitted}
                                    </button>
                                </td>
                                <td>{data.applicationDateAndTime}</td>
                                <td>{data.approval}</td>
                                <td>{data.reasonForRejectionOfApproval}</td>
                                <td>{data.approvalDateAndTime}</td>
                                <td>{data.manager}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
            <div className={Styles.pagination}>
                {InvestmentTypejson.length > itemsPerPage && (
                    <ul>

                        <li>
                            <button onClick={() => paginate(1)} disabled={currentPage === 1}>
                                {"<<"}
                            </button>
                        </li>

                        <li>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                {"<"}
                            </button>
                        </li>

                        {Array.from({ length: Math.ceil(InvestmentTypejson.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className={currentPage === index + 1 ? Styles.active : ''}>
                                <button onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(InvestmentTypejson.length / itemsPerPage)}>
                                {">"}
                            </button>
                        </li>

                        <li>
                            <button onClick={() => paginate(Math.ceil(InvestmentTypejson.length / itemsPerPage))} disabled={currentPage === Math.ceil(InvestmentTypejson.length / itemsPerPage)}>
                                {">>"}
                            </button>
                        </li>
                    </ul>
                )}
            </div>


            <div>
                {statusChangeModalOpen && requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Please enter required information.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => openStatusChangeModal(false)}>Check</button>

                        </div>
                    </div>
                )}




                {statusChangeModalOpen && checkedCount === 2 && !requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>

                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Would you like to change the approval status of the two selected people?
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btn1} onClick={() => openStatusChangeModal(false)}>Check</button>
                            <button className={ApprovalStyles.btn2} onClick={() => openStatusChangeModal(false)}>Cancellation</button>
                        </div>
                    </div>
                )}


                {statusChangeModalOpen && checkedCount != 0 && checkedCount != 2 && !approvedCheck && !rejectCheck && !requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>

                                <svg className={ApprovalStyles.svgbgcolorforsucess}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M7 13l3 3 7-7" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >


                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Saved.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => openStatusChangeModal(false)}>Check</button>
                        </div>
                    </div>
                )}

                {statusChangeModalOpen && checkedCount != 0 && checkedCount != 2 && approvedCheck && !rejectCheck && !requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>

                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            You are already an approved member.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => openStatusChangeModal(false)}>Check</button>
                        </div>
                    </div>
                )}
                {statusChangeModalOpen && checkedCount != 0 && checkedCount != 2 && !approvedCheck && rejectCheck && !requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>

                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            This member has already been rejected.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => openStatusChangeModal(false)}>Check</button>
                        </div>
                    </div>
                )}
                {statusChangeModalOpen && checkedCount === 0 && !requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => openStatusChangeModal(false)} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            There are no applications selected.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => openStatusChangeModal(false)}>Check</button>

                        </div>
                    </div>
                )}

                {lookOpen && (
                    <div className={`${ApprovalStyles.modalmain} ${ApprovalStyles.modalmain_img}`}>

                        <div>
                            <div className={ApprovalStyles.content_full}>
                                <div className={ApprovalStyles.content_left}>
                                    <span>document</span>

                                </div>
                                <div className={ApprovalStyles.content_right}>
                                    <img className={ApprovalStyles.must_img} src={saveIcon.src} alt="bia" />
                                </div>

                            </div>
                            <div className={ApprovalStyles.btnsforimage}>
                                <a
                                    href="/path/to/demo.pdf" // Replace "/path/to/demo.pdf" with the actual URL of your PDF file
                                    download="demo.pdf"
                                    className={ApprovalStyles.btnforfiledownload}
                                >
                                    Download File
                                </a>

                                <button className={ApprovalStyles.btnforcancel} onClick={() => lookModalHandle(false)}>check</button>

                            </div>
                        </div>
                    </div>
                )}


                {addOpen && (
                    <div className={ApprovalStyles.addmodalmain}>
                        <div className={ApprovalStyles.addmodal}>
                            <div>
                                <p><b>Change investment type</b></p>
                            </div>
                            <div className={ApprovalStyles.addclosebtn} onClick={() => addModalHandle(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.addcontent}>
                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="membership">Membership number:</label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <input type="text" id="membership" placeholder="abc111" name="membership" value={formData.membership} onChange={handleChange} />
                                </div>
                            </div>

                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="member">Member name/corporaton:</label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <input type="text" id="member" placeholder="King Gil-dong" name="member" value={formData.member} onChange={handleChange} />
                                </div>
                            </div>
                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="investment">Investment type:<span className={ApprovalStyles.required}>*</span></label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <select id="investment" name="investment" value={formData.investment} onChange={handleChange}>
                                        <option value="1" selected>general individual</option>
                                        <option value="2">Income eligibility</option>
                                        <option value="3">personal expertise</option>
                                        <option value="4">corporation</option>
                                        <option value="5">ccredit finance</option>
                                        <option value="6">P2P On2</option>
                                    </select>
                                </div>
                            </div>
                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="documents">Attach documents:<span className={ApprovalStyles.required}>*</span></label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <input type='file' id="documents" name="documents" onChange={handleFileChange} />
                                </div>
                            </div>

                        </div>
                        <div>
                            <p>The only file formata available are  jpg,jpeg,gif and pdf.</p>
                            <p>You can register up to 1o items and 100MB.</p>
                        </div>
                        <div className={ApprovalStyles.addbtns}>
                            <button className={ApprovalStyles.addbtn1} onClick={() => handleSubmit(true)}>Save</button>
                            <button className={ApprovalStyles.addbtn2} onClick={() => addModalHandle(false)}>Cancellation</button>
                        </div>
                    </div>
                )}



                {addOpen && requiredCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Please enter required information.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>

                        </div>
                    </div>
                )}
                {addOpen && fileTypeCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Only jpg, jpeg, gif, png, and pdf files can be registered.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>

                        </div>
                    </div>
                )}
                {addOpen && maxImageCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Up to 10 items can be registered.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>

                        </div>
                    </div>
                )}
                {addOpen && imageSizeCheck && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Up to 100MB can be registered.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>

                        </div>
                    </div>
                )}
                {addOpen && fileRegistrationFail && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            File registration failed.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>

                        </div>
                    </div>
                )}
                {addOpen && !fileTypeCheck && !maxImageCheck && !imageSizeCheck && !fileRegistrationFail && fileRegistrationConfirmation && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>
                                <svg className={ApprovalStyles.svgbgcolor}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Would you like to change your investment type?
                        </div>

                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btn1} onClick={() => modalCloseForAddPopup(true, 'sucess')}>Check</button>
                            <button className={ApprovalStyles.btn2} onClick={() => modalCloseForAddPopup(false, '')}>Cancellation</button>
                        </div>
                    </div>
                )}
                {addOpen && !fileTypeCheck && !maxImageCheck && !imageSizeCheck && !fileRegistrationFail && !fileRegistrationConfirmation && addInvestmentType && (
                    <div className={ApprovalStyles.modalmain}>
                        <div className={ApprovalStyles.modal}>
                            <div>

                                <svg className={ApprovalStyles.svgbgcolorforsucess}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M7 13l3 3 7-7" />
                                </svg>

                            </div>
                            <div className={ApprovalStyles.closebtn} onClick={() => modalCloseForAddPopup(false, '')} >


                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                        </div>
                        <div className={ApprovalStyles.content}>
                            Saved.
                        </div>
                        <div className={ApprovalStyles.btns}>
                            <button className={ApprovalStyles.btnforsingle} onClick={() => modalCloseForAddPopup(false, '')}>Check</button>
                        </div>
                    </div>
                )}


                {modalOpen && (
                    <div className={ApprovalStyles.addmodalmain}>
                        <div className={ApprovalStyles.addmodal}>
                            <div>
                                <p><b>Enter reason for rejection of approval</b></p>
                            </div>
                            <div className={ApprovalStyles.addclosebtn} onClick={closeModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </div>
                        </div>
                        <div className={ApprovalStyles.addcontent}>
                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="membership">Membership number:</label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <input type="text" id="membership" placeholder="abc111,abc222" name="membership" value={approvalStatusData.membership} onChange={handleChangeForApprovalStatus} />
                                </div>
                            </div>

                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="member">Member name/corporaton:</label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <input type="text" id="member" placeholder="King Gil-dong,Ganadara Inevstment Co.." name="member" value={approvalStatusData.member} onChange={handleChangeForApprovalStatus} />
                                </div>
                            </div>
                            <div className={ApprovalStyles.addcontent_labels} >
                                <div className={ApprovalStyles.addcontent_labels_width} >
                                    <label htmlFor="reason">Reason for rejection of approval:<span className={ApprovalStyles.required}>*</span></label>
                                </div>
                                <div className={ApprovalStyles.addcontent_input_width}>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="reason"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="reason">Documenu unidentifiable</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="income_eligibility"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="income_eligibility">Required documents missing</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="personal_expertise"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="personal_expertise">The contents of the document are different from the registered member information.</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="corporation"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="corporation">There is missing information in the document (required information, company seal, personal seal, personal signature, etc.)</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="credit_finance"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="credit_finance">The validity period of the document has been exceeded</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <input
                                            type="checkbox"
                                            id="p2p_on2"
                                            name="reason"
                                            onChange={handleChangeForApprovalStatus}
                                        />
                                        <label htmlFor="p2p_on2">Direct input</label>
                                    </div>
                                    <div className={ApprovalStyles.fontSizeforapprovalstatus}>
                                        <textarea
                                            id="additional_info"
                                            name="textarea"
                                            value={approvalStatusData.textarea} onChange={handleChangeForApprovalStatus}
                                            placeholder="Enter Reason"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={ApprovalStyles.addbtns}>
                            <button className={ApprovalStyles.addbtn1} onClick={() => openStatusChangeModal(true)}>Save</button>
                            <button className={ApprovalStyles.addbtn2} onClick={closeModal}>Cancellation</button>
                        </div>
                    </div>
                )}
            </div>




        </>
    );
};

export default InvestmentType;
