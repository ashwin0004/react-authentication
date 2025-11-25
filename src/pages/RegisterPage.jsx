import React, { useState } from 'react';
import { UserCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from '../router/Router';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = e =>
    !e ? 'Email is required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? 'Please enter a valid email'
    : '';

  const validatePassword = p =>
    !p ? 'Password is required'
    : p.length < 6 ? 'Password must be at least 6 characters'
    : '';

  const validateConfirm = c =>
    c !== formData.password ? 'Passwords do not match' : '';

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let err = '';
    if (name === 'email') err = validateEmail(value);
    if (name === 'password') err = validatePassword(value);
    if (name === 'confirmPassword') err = validateConfirm(value);

    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const submit = e => {
    e.preventDefault();

    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    const confirmErr = validateConfirm(formData.confirmPassword);

    if (emailErr || passErr || confirmErr) {
      setErrors({ email: emailErr, password: passErr, confirmPassword: confirmErr });
      return;
    }

    // Get all users or empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const exists = users.some(u => u.email === formData.email);
    if (exists) {
      alert("Email already registered!");
      return;
    }

    //  Add new user
    users.push({
      email: formData.email,
      password: formData.password
    });

    //  Save again or back
    localStorage.setItem("users", JSON.stringify(users));

    setShowSuccess(true);

    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <UserCircle className="w-12 h-12 text-blue-600 mx-auto" />
          <h2 className="text-2xl font-bold">Create Account</h2>
        </div>

        {showSuccess && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded flex gap-2">
            <CheckCircle /> Registration successful! Redirecting...
          </div>
        )}

        <form onSubmit={submit} className="space-y-4 mt-4">
          <input className="w-full border p-2 rounded" placeholder="Email" name="email" onChange={handleChange} />
          {errors.email && <p className="text-red-600 text-sm flex gap-1"><AlertCircle className='w-4' /> {errors.email}</p>}

          <input className="w-full border p-2 rounded" placeholder="Password" name="password" type="password" onChange={handleChange} />
          {errors.password && <p className="text-red-600 text-sm flex gap-1"><AlertCircle className='w-4' /> {errors.password}</p>}

          <input className="w-full border p-2 rounded" placeholder="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />
          {errors.confirmPassword && <p className="text-red-600 text-sm flex gap-1"><AlertCircle className='w-4' /> {errors.confirmPassword}</p>}

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?
          <button className="text-blue-600 ml-1" onClick={() => navigate('/login')}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
