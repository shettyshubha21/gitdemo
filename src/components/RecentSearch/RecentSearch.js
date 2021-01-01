import React, {useEffect, useState} from 'react';
import styles from './RecentSearch.module.css';
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import Modal from '../Modal/Modal';
import { HiSearch } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const RecentSearch = ({searchInfo, setSearchInfo, favInfo, setFavInfo, setSelectedIndex, degrees, setDegrees, weatherData, handleChange, form, setForm}) => {
const [clear,setClear] = useState(false);
let history = useHistory();

const handleClick  = async (e, city) => {
  await setForm({city:city});
  console.log(city);
  weatherData(e, city);
  history.push("/");
}

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

const hearts = () => {
  const displayHeart = searchInfo.map((item) => {
    const favele = favInfo.find((ele) => ele.name === item.name);
    if(favele) {
      return { ...item, isFav: true}
    }
    else {
      return { ...item, isFav: false} 
    }
  })
  setSearchInfo(displayHeart);
}

useEffect (() => {
  hearts();
})

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
    <button onClick={(e)=>{history.push("/"); weatherData(e)} } >
      {<HiSearch/>}
    </button>
  </form>
</div>
    <div  className={styles.RecentSearch}>
    {searchInfo.length===0? <div className={styles.message}>
        <div className={styles.image}></div>
       <h1 className={styles.favText}>No Recent Search</h1>
   </div> :

      <div>
      <div className={styles.clearAll}>
      <p>You recently searched for</p>
      <p onClick={() => {setClear(true)}}>Clear All</p>
    </div>

    {clear && <Modal clear={clear} setClear={setClear} searchInfo={searchInfo} setSearchInfo={setSearchInfo} />}

    {searchInfo.map((menuItem)=> {
        const {name, country, icon, degree, description, isFav} = menuItem;
        return (
          
         <table className={styles.ContentTable}>
            <tr className={styles.column} onClick={(e) =>{handleClick(e,name); console.log(name)}}>
              <td className={styles.column1}>{name}, {country}</td>
              <td className={styles.column2}> <img src={icon} alt={name} className={styles.photo}/></td>
              <td className={styles.column2}>  <h1 className={styles.degree}>{degrees? degree : Math.floor((degree * 1.8) + 32)}<sup className={styles.sup}>o</sup><h1 className={styles.celcius}>{ degrees ? 'C' : 'F'}</h1></h1></td>
              <td className={styles.column2}> <h1 className={styles.description}>{titleCase(description) }</h1></td>
              <td className={styles.column3}>  {isFav ? <BsFillHeartFill className={styles.heartsColour} onClick={() => {const changeFav = favInfo.filter((ele) => ele.name !== name); setFavInfo(changeFav);} }/> : <BsHeart className={styles.heartColour}/> }</td>
            </tr>
          </table>
         
        )
      })}
      </div>
    }
      </div>
</div>
);
};

export default RecentSearch;


