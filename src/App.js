import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from './components/Home/Home';
import Favourite from './components/Favourite/Favourite';
import RecentSearch from './components/RecentSearch/RecentSearch';
import { useState} from 'react';
import Modal from './components/Modal/Modal';
import { useLocalStorageState } from './useLocalStorageState';


function App() {

  const [favInfo, setFavInfo] = useState([]);
  const [message,setMessage] = useState(false);

  const [searchInfo, setSearchInfo] =useLocalStorageState([]);

  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let days = [ "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = ' ' + d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},${date} ${month} ${year}`;
  };
  function timeBuilder(date) {
    var hours = date.getHours();
    var minutes =  date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (
    <Router>
      <div className="App">
      <div className="background">
      <div className="logo">
      </div>
        <nav className="nav"> 
          <ul className="list">
           <li>
              <NavLink exact activeClassName="selected" className="home"  to="/">HOME</NavLink>
            </li>
            <li >
              <NavLink activeClassName="selected"  className="fav" to="/favourite">FAVOURITE</NavLink>
            </li> 
           <li>
              <NavLink activeClassName="selected"  className="search" to="/recentsearch">RECENT SEARCH</NavLink>
            </li> 
            <div className="date">{dateBuilder(new Date())} <span className="separateTime"></span> {timeBuilder(new Date())}</div>
          </ul>
          <div className="line"></div>
          </nav>
          

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recentsearch">
            <RecentSearch 
              searchInfo = {searchInfo}
              setSearchInfo = {setSearchInfo}

              favInfo={favInfo}
              setFavInfo={setFavInfo}
            />
          </Route>
          
          <Route path="/favourite">
            <Favourite favInfo={favInfo}
              setFavInfo={setFavInfo} 
          />
          </Route>

          <Route path="/modal">
            <Modal
              favInfo={favInfo}
              setFavInfo={setFavInfo}
            />
          </Route>

          <Route  path="/">
            <Home favInfo={favInfo}
              setFavInfo={setFavInfo}
              message={message}
              setMessage={setMessage}

              searchInfo = {searchInfo}
              setSearchInfo = {setSearchInfo}
            />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
