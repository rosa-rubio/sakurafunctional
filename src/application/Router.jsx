import React from 'react';
import App from
 '../App.jsx';
import '../index.css';
import { createBrowserRouter } from 'react-router-dom'; 
import Main from '../pages/Main.jsx';
import Favorites from '../pages/Favorites.jsx'

export const Router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/Main',
    element: <Main />
  },
  {
    path:'/Favorites',
    element: <Favorites />
  },
])
