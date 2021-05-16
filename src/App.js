import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import "@sweetalert2/theme-material-ui";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import combinedReducers from './redux/combinedReducers.js';
import { defaultTheme, ThemeContext, Themes } from './theme/ThemeContext.js';
import { useEffect, useState } from 'react';
import firebase from 'firebase';

function App() {

  const [currentTheme, setCurrentTheme] = useState();

  useEffect(() => {
    setCurrentTheme(defaultTheme);
    console.log(firebase.auth().currentUser)
  },[])

  function changeTheme() {
      if(currentTheme === Themes.LIGHT) {
          setCurrentTheme(Themes.DARK);
      } else {
          setCurrentTheme(Themes.LIGHT);
      }
  }

  localStorage.setItem("currentTheme", (localStorage.currentTheme || "light"));

  return (
    <Router>
      <ThemeContext.Provider value={{currentTheme: currentTheme, changeTheme: () => changeTheme()}}>
        <div style={currentTheme}>
          <PrivateRoute path="/" exact></PrivateRoute>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;

export const store = createStore(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );