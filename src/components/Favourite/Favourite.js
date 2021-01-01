import React, { useState } from 'react';
import styles from './Favourite.module.css';
import { BsFillHeartFill } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import Modal from '../Modal/Modal';
import { useHistory } from "react-router-dom";

const Favourite = ({favInfo, setFavInfo, setSelectedIndex, degrees,setDegrees, weatherData, handleChange, form, setForm}) => {

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

 const handleClick  = async (e, city) => {
  await setForm({city:city});
  console.log(city);
  weatherData(e, city);
  history.push("/");
}

  const [show,setShow] = useState(false);
  let history = useHistory();
  return (
  <div>
    <div >
    <div className={styles.logo}></div>
    <form className={styles.searchField}>
        <input
          type="text"
          placeholder="Search city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e)=>{history.push('/'); weatherData(e)} } >
          {< HiSearch/>}
        </button>
      </form>
    </div>
  <div className={styles.Favourite }>
    
    {favInfo.length===0? <div className={styles.message}>
        <div className={styles.image}></div>
        <h1 className={styles.favText}>No Favourites added</h1>
    </div> :
    <div>
    <div className={styles.removeAll}>
        <p className={styles.cityNumber}>{favInfo.length} City added as favourite</p>
        <p onClick={() => {setShow(true)}} className={styles.removeButton}>Remove all</p>
    </div>

    { show && (<Modal show={show} setShow={setShow} favInfo={favInfo} setFavInfo={setFavInfo}/>)}
    

    {favInfo.map((menuItem)=> {
        const {name, country, icon, degree, description} = menuItem;
        return (
          <table className={styles.ContentTable}>
            <tr className={styles.column} onClick={(e) =>{handleClick(e,name)}}>
              <td className={styles.column1}>{name}, {country}</td>
              <td className={styles.column2}> <img src={icon} alt={name} className={styles.photo}/></td>
              <td className={styles.column2}>  <h1 className={styles.degree}>{degrees? degree : Math.floor((degree * 1.8) + 32)}<sup className={styles.sup}>o</sup><h1 className={styles.celcius}>{ degrees ? 'C' : 'F'}</h1></h1></td>
              <td className={styles.column2}> <h1 className={styles.description}>{titleCase(description) }</h1></td>
              <td className={styles.column3}> <BsFillHeartFill className={styles.heartsColour}/></td>
            </tr>
          </table>
        )
      })}
    </div>}
  </div>
  </div>
  );
};

export default Favourite;
