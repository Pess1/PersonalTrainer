import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Customers from './components/customers';
import Trainings from './components/trainings';
import Navigator from './components/navigator';
import Checkbox from '@material-ui/core/Checkbox';
import NightsStayIcon from '@material-ui/icons/NightsStay';

function App() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  if (checked == false) {
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
            <Route render={() => <h1>Page not found!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );

    
}

export default App;
