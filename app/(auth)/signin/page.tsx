'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'

function Page() {
  const [data, setData] = useState({email: "", password: ""});
  const [status, setStatus] = useState("");

  const handleUpdate = (value: string, field: string) => {
    setData(prev => ({...prev, [field]: value}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting..");
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/dashboard"
    }).then(res => {
      console.log(res);
      setStatus("Logged in");
    }).catch(err => {
      console.error(err);
      setStatus("Error occurred");
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <input type='email' name='email' placeholder='Email Address' value={data.email} onChange={e => handleUpdate(e.target.value, "email")} />
      <input type='password' name='password' placeholder='Password' value={data.password} onChange={e => handleUpdate(e.target.value, "password")} />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
      <p>{status}</p>
    </div>
  )
}

export default Page;