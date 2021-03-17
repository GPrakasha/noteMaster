import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import "@sweetalert2/theme-material-ui";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  localStorage.setItem("themes", JSON.stringify({
    light: {
      background: "#fff",
      color: "#000"
    },
    dark: {
      background: "#000",
      color: "#fff"
    }
  }));
  

  localStorage.setItem("currentTheme", (localStorage.currentTheme || "light"));

  return (
    <Router>
        <PrivateRoute path="/" exact></PrivateRoute>
    </Router>
  );
}

export default App;
