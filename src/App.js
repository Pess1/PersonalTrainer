import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Customers from './components/customers';
import Trainings from './components/trainings';
import TrainingCalendar from './components/calendar';
import Stats from './components/stats';
import Navigator from './components/navigator';
import Checkbox from '@material-ui/core/Checkbox';
import NightsStayIcon from '@material-ui/icons/NightsStay';

function App() {

  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(date.getHours())

  useEffect(() => {
    setDarkmodeAutomatically();
  }, [])

  const setDarkmodeAutomatically = () => {
    if(time >= 20 || time < 7) {
      setChecked(true)
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  if (checked === false) {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#8a9ab5", padding: "20px"}}>
              <div className="collapse navbar-collapse" id ="navbarSupportedContent">
                <a className="navbar-brand" href="/">Personal Trainer</a>
                <Navigator/>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  icon={<NightsStayIcon/>}
                />
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Customers} />
              <Route path="/Trainings" component={Trainings} />
              <Route path="/Calendar" component={TrainingCalendar} />
              <Route path="/Stats" component={Stats} />
              <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  return (
    <div className="App" style={{backgroundColor: "#242830", color: "white"}}>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#8a9ab5", padding: "20px"}}>
            <div className="collapse navbar-collapse" id ="navbarSupportedContent">
              <a className="navbar-brand" href="/">Personal Trainer</a>
              <Navigator/>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checkedIcon={<NightsStayIcon/>}
                style={{color: "yellow"}}
              />
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Customers} />
            <Route path="/Trainings" component={Trainings} />
            <Route path="/Calendar" component={TrainingCalendar} />
            <Route path="/Stats" component={Stats} />
            <Route render={() => <h1>Page not found!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );

    
}

export default App;
