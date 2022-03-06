import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './css/index.css';

import App from './components/App/App';
import CharactersList from './components/CharactersList/CharactersList';
import CharacterDetailedInfo from './components/CharacterDetailedInfo/CharacterDetailedInfo';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<CharactersList />}/>
          <Route path=':characterName' element={<CharacterDetailedInfo />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
