import React, {useState} from 'react';
import styles from './DisplayWeather.module.css';
import { FaThermometerHalf, FaCloudRain, FaWind } from "react-icons/fa";
import { FiDroplet } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import cn from 'classnames';
import icon1 from '../icons/drop.png'
import icon2 from '../icons/precipitation.png'
import icon3 from '../icons/temp.png'
import icon4 from '../icons/visibility.png'
import icon5 from '../icons/wind.png'


const  DisplayWeather = ({data}) => {
  const [degree, setDegree] = useState(true);
  
  const buttonClasses = cn(styles.btn,styles.btnC, {[styles.Active]: degree});
  const buttonClass = cn(styles.btn, styles.btnF, {[styles.Active]: !degree});

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
 

  const iconurl =
    "http://openweathermap.org/img/w/" +
    `${data.name !== undefined ? data.weather[0].icon : null}` +
    ".png";
     
    return (
      <div className={styles.DisplayWeather}>
        {data.name !== undefined ? (
          <div>
            <div className={styles.Display}>
              <span className={styles.Name}>
                {data.name}, {data.sys.country}
              </span>
              <div className={styles.icon}>
                <img  className={styles.img} src={iconurl} alt="" srcset="" />
              </div>
              
              <div className={styles.toggle}>
                <button onClick={() => { setDegree(true); console.log(degree)}} className={buttonClasses} ><sup>o</sup>C</button>
                <button onClick={() => { setDegree(false); console.log(degree)}} className={buttonClass}><sup>o</sup>F</button>
              </div>

              {degree? <h1 className={styles.degree}>
                {Math.floor(data.main.temp)}
              </h1> : <h1 className={styles.degree}>
                {Math.floor((data.main.temp * 1.8) + 32)}
              </h1>}
            
             
              <div className={styles.description}>
              <span >
                {titleCase(data.weather[0].description)}
              </span>
              </div>
             
            </div>

            {/* footer */}
            <div className={styles.line}></div>
          <div className={styles.icons}>
              <div className={styles.firstIcon}>
                  <img src={icon3}></img>
              </div>
              <div className={styles.text}>
                  Min-Max
                  <span>{Math.floor(data.main.temp_min)}<sup>o</sup>-{Math.floor(data.main.temp_max)}<sup>o</sup></span>
              </div>
              <div className={styles.secondIcon}>
                <img src={icon2}></img>
              </div>
              <div className={styles.text}>
                  Precipitation
                  <span>{data.rain? data.rain['1h'] + 'mm'  : ( data.snow? data.snow['1h'] + 'mm' : '0%' ) }</span>
              </div>
              <div className={styles.thirdIcon}>
                <img src={icon1}></img>
              </div>
              <div className={styles.text}>
                  Humidity
                  <span>{data.main.humidity}%</span>
              </div>
              <div className={styles.fourthIcon}>
                <img src={icon5}></img>
              </div>  
              <div className={styles.text}>
                  Wind
                  <span>{Math.floor(data.wind.speed * 2.236936)} mph</span>
              </div>
              <div className={styles.fifthIcon}>
                <img src={icon4}></img>
              </div>  
              <div className={styles.text}>
                  Visibility
                  <span>{Math.floor(data.visibility)} mph</span>
              </div>  
          </div> 
          </div>
        ) : (
          <div className={styles.error}>
            <h2>City not found</h2>
          </div>
        )}
      
      </div>
      
    );
  }

export default DisplayWeather;
