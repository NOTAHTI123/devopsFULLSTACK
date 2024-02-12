import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import './main.css';

import Watch from './components/Watch/Watch.jsx';
import UploadMovie from './components/Admin/UploadMovie.jsx';

import { Provider } from 'react-redux';
import store from './store.js';

import Results from './components/Results/Results.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route exact path='/pk' element={ <LandingPage /> } />
        <Route exact path='/watch/:id' element={ <Watch /> } />

        <Route exact path='/pk/movies/upload' element={<UploadMovie />} />

        <Route exact path='/pk/content/results/:keyword' element={<Results />} />
      </Routes>
    </Router>
  </Provider>
)
