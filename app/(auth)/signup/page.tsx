'use client'
import { signup } from '@/services/AuthService'; // You'll need to create this function
import React, { useState } from 'react'

function Page() {
  const [data, setData] = useState({
    name: "",
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState("");

  const handleUpdate = (value: string, field: string) => {
    setData(prev => ({...prev, [field]: value}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setStatus("Passwords don't match");
      return;
    }

    setStatus("Submitting..");
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      id: undefined,
      emailVerified: null,
      image: null
    }).then(res => {
      console.log(res);
      setStatus("Account created successfully");
      // Optionally redirect to login or dashboard
    }).catch(err => {
      console.error(err);
      setStatus("Error occurred");
    })
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          name='name' 
          placeholder='Name'
          value={data.name} 
          onChange={e => handleUpdate(e.target.value, "name")} 
        />
        <input 
          type='email' 
          name='email' 
          placeholder='Email'
          value={data.email} 
          onChange={e => handleUpdate(e.target.value, "email")} 
        />
        <input 
          type='password' 
          name='password' 
          placeholder='Password'
          value={data.password} 
          onChange={e => handleUpdate(e.target.value, "password")} 
        />
        <input 
          type='password' 
          name='confirmPassword' 
          placeholder='Confirm Password'
          value={data.confirmPassword} 
          onChange={e => handleUpdate(e.target.value, "confirmPassword")} 
        />
        <button type="submit">Sign Up</button>
        <p>{status}</p>
      </form>
    </div>
  )
}

export default Page;