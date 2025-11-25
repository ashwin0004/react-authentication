import React, { useState, useEffect } from 'react';

export const RouterContext = React.createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/register');

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged === 'true') setCurrentPath('/home');
  }, []);

  const navigate = (path) => setCurrentPath(path);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const ctx = React.useContext(RouterContext);
  return ctx.navigate;
};

export const useLocation = () => {
  const ctx = React.useContext(RouterContext);
  return { pathname: ctx.currentPath };
};