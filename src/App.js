
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddProducts from './components/AddProducts';
import ProductsList from './components/ProductsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './components/Chart';
import Typography from '@mui/material/Typography';

function App() {
  function Copyright(props) {
    return (
      
  //Code for the footer
  
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
       Cognizant{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <>
   
      <Router>
        <Routes>

          <Route path="/" element={<SignIn/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/pro" element={<AddProducts/>}/>
          <Route path="/products" element={<ProductsList />}/>
          <Route path='/chart' element ={<Chart/>}/>
        </Routes>
      

      </Router>
    
      </>  
  );
}

export default App;
