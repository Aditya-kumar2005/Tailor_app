import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /auth/register
    console.log("Register:", { name, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name}
          onChange={(e)=>setName(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="password" placeholder="Password" value={password}
          onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;