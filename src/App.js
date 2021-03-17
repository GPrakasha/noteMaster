import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './Notes.jsx';
import Note from './Note';
import Swal from 'sweetalert2/src/sweetalert2.js'
import PrivateRoute from './PrivateRoute.js';
import "@sweetalert2/theme-material-ui";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      {/* <div> */}
        <PrivateRoute path="/" component={Notes} exact></PrivateRoute>
      {/* </div> */}
      <PrivateRoute path="/notes/:id" component={Note} exact></PrivateRoute>
    </Router>
  );
}

export default App;
