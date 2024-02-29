import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/layout';
import { AppProvider } from './component/mycontext';
import "bootstrap/dist/css/bootstrap.min.css"
import Logon from './component/Logon';
import AlbumList from './component/albumList';
import PhotoList from './component/photoList';

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />} >
            <Route path='/album/list' element={<AlbumList />} />
            <Route path='/photo/list' element={<PhotoList />} />
            <Route index element={<Logon />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
