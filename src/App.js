import './App.css';
import Registration from './register';
import Profile from './profile';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='/' element={<Registration/>} />
    <Route path='/profile' element={<Profile/>} />
  </Routes>
    </div>
  );
}

export default App;
