import React,{useState} from 'react';
import { AlertCircle, UserCircle } from 'lucide-react';
import { useNavigate } from '../router/Router';

export default function LoginPage(){
  const navigate=useNavigate();
  const [form,setForm]=useState({email:'',password:''});
  const [error,setError]=useState('');

  const submit=()=>{
    // 🔥 Read all users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔥 Find matching user
    const found = users.find(
      u => u.email === form.email && u.password === form.password
    );

    if (found) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(found));
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <UserCircle className="w-12 h-12 text-purple-600 mx-auto"/>
          <h2 className="text-2xl font-bold">Login</h2>
        </div>

        {error && <p className="p-3 bg-red-100 text-red-600 flex gap-2"><AlertCircle/>{error}</p>}

        <input className="w-full border p-2 rounded mt-4" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>

        <input className="w-full border p-2 rounded mt-4" placeholder="Password" type="password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <button className="w-full bg-purple-600 text-white py-2 rounded mt-4" onClick={submit}>Login</button>

        <p className="mt-4 text-center">No account? 
          <button className="text-purple-600 ml-1" onClick={()=>navigate('/register')}>Register</button>
        </p>
      </div>
    </div>
  );
}
