import React from 'react';
import { Router, useLocation } from './router/Router';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function AppContent(){
  const { pathname } = useLocation();
  if(pathname==='/register') return <RegisterPage/>;
  if(pathname==='/login') return <LoginPage/>;
  if(pathname==='/home') return <HomePage/>;
  return <RegisterPage/>;
}

export default function App(){
  return <Router><AppContent/></Router>;
}
