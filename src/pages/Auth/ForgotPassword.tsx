import React, { useState } from "react";
import api from "../../api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      const message = (err as any)?.response?.data?.error || "Failed to submit";
      setMsg(message);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {msg && <p className="text-sm text-green-600 mb-2">{msg}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Reset</button>
      </form>
    </div>
  );
};

export default ForgotPassword;