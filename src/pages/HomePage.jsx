import React,{useEffect,useState} from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from '../router/Router';

export default function HomePage(){
  const navigate=useNavigate();
  const [email,setEmail]=useState('');

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setEmail(user.email);
  },[]);

  const logout=()=>{
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="font-bold text-xl">HomePage</h1>
        <button onClick={logout} className="flex gap-2 bg-red-600 text-white px-4 py-2 rounded">
          <LogOut/> Logout
        </button>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold">Welcome {email}</h2>
        <p className="mt-4 text-gray-600">You are logged in!</p>
      </div>
    </div>
  );
}
