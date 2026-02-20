import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API: POST /auth/forgot-password
    console.log("Reset password for:", email);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Reset</button>
      </form>
    </div>
  );
};

export default ForgotPassword;