import React, {useState} from 'react';
import styles from './Home.module.css';
import DisplayWeather from '../DisplayWeather/DisplayWeather';
import { HiSearch } from "react-icons/hi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import cn from 'classnames';

const Home = ({favInfo, setFavInfo, message, setMessage, searchInfo, setSearchInfo, degrees, setDegrees, form, setForm, weather, setWeather, weatherData, handleChange}) => {
/*   const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: ""
  });
 */
  const heart = cn(styles.favButton, {[styles.Active]: message});
  
    
  /* const APIKEY = "6d60bab8f1abb2a000ac29259c7d1b26"; */
 /*  async function weatherData(e) {
    e.preventDefault();
      if (form.city === "") {
        alert("Add values");
      } else {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&units=metric&APPID=${APIKEY}`
        )
          .then((res) => res.json())
          .then((data) => data);
        console.log(data); 
        setWeather({ data: data });
      }
  } */
  
 /*  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  }; */
 
  /* const recentSearch = () => {
      if(weather.data && weather.data.cod !== '404') {
        let details = searchInfo.concat({name:weather.data.name, country:weather.data.sys.country, icon: "http://openweathermap.org/img/w/" + `${weather.data.name !== undefined ? weather.data.weather[0].icon : null}` + ".png", degree: Math.floor(weather.data.main.temp), description:weather.data.weather[0].description }); 
        setSearchInfo(details);
        console.log(searchInfo);
      } 
  }    */


  return (
  <div className={styles.Home }>
  <div className={styles.logo}></div>
    <form onSubmit={() =>{weatherData(); setMessage(false); }} className={styles.searchField}>
      <input
        type="text"
        placeholder="Search city"
        name="city"
        onChange={(e) => handleChange(e)}
      />
      
      <button onClick={(e) => {weatherData(e); setMessage(false); }} >
        {<HiSearch/>}
      </button>
    </form>
      
      
    {/* {console.log(weather)} */}
    {weather.data !== undefined ? (
    <div>
      <DisplayWeather degrees={degrees} setDegrees={setDegrees} data={weather.data} />
      <div className={styles.button}>
    
      <p onClick={()=>{setMessage(prev => !prev); console.log(message); if(!message) {const newInfo = favInfo.concat({name:weather.data.name, country:weather.data.sys.country, icon: "http://openweathermap.org/img/w/" + `${weather.data.name !== undefined ? weather.data.weather[0].icon : null}` + ".png", degree: Math.floor(weather.data.main.temp), description:weather.data.weather[0].description }); 
            let newFavInfo = newInfo.filter( (ele, ind) => ind === newInfo.findIndex( elem => elem.name === ele.name && elem.icon === ele.icon));
            setFavInfo(newFavInfo); console.log(favInfo); console.log(weather.data.name)} else if(message){ const arrs = favInfo.filter((ele) => ele.name !== weather.data.name); setFavInfo(arrs) }}} className={heart}>{message? <BsHeartFill/> : <BsHeart/>}</p> 
        </div>
          {
            message ? <div className={styles.favText}>
            <p className={styles.activeColor}>Added to favourite</p>
          </div> : <div className={styles.favText}>
            <p>Add to favourite</p>
          </div>
          }
          
    </div>) : null}
  </div>
  );
};

export default Home;
