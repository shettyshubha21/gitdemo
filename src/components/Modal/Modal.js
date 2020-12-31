import React from 'react';
import styles from './Modal.module.css';

const Modal = ({show,setShow, favInfo, setFavInfo, clear, setClear, searchInfo, setSearchInfo}) => {
    
    const close = () => {
        setShow(false);
    }

    const Close = () => {
        setClear(false);
    }

return (
<div className={styles.Modal }>
{show && (
       <div className={styles.overlay}>
           <div className={styles.header}>
                <h1>Are you sure that you want to remove all the favourites</h1>
           </div>
            <div className={styles.btn}>
            <button className={styles.button} onClick={() => {close(); favInfo.length=0; setFavInfo(favInfo);}}>Yes</button>
            <button className={styles.button} onClick={() => {close(); setFavInfo(favInfo); }}>No</button>
            </div>
       </div>
   )
   }

   {clear && (
       <div className={styles.overlay}>
           <div className={styles.header}>
                <h1>Are you sure that you want to clear all the recent search</h1>
           </div>
            <div className={styles.btn}>
            <button className={styles.button} onClick={() => {Close();  searchInfo.length=0; setSearchInfo(searchInfo);  }}>Yes</button>
            <button className={styles.button} onClick={() => {Close(); setSearchInfo(searchInfo); }}>No</button>
            </div>
       </div>
   )
   }
</div>
);
};

export default Modal;
