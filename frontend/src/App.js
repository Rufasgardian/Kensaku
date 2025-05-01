
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/helpers/Header';
import Footer from './components/helpers/Footer';
import HomePage from './components/pages/HomePage';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import PrivateRoute from './components/pages/PrivateRoute'
import Dashboard from './components/pages/Dashboard';
import Upload from './components/pages/Upload';
import FileDetails from './components/pages/FileDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          {/* <Route path="/result/:id" element={<PrivateRoute><Result /></PrivateRoute>} /> */}
          <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/files/:fileId" element={<PrivateRoute><FileDetails /></PrivateRoute>} />

        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
