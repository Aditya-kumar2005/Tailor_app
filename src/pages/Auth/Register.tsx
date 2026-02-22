import React, { useState } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // default customer registration
      const role = "Customer";
      const res = await api.post("/auth/register", { name, email, password, role });
      const { user, token } = res.data;
      localStorage.setItem('token', token);
      dispatch(login({ profile: user, token }));
      navigate("/dashboard");
    } catch (err) {
      const message = (err as any)?.response?.data?.error || "Registration failed";
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Register (Customer)</h2>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-2">
          <input type="text" placeholder="Name" value={name}
            onChange={(e)=>setName(e.target.value)} className="border p-2 w-full"/>
          <input type="email" placeholder="Email" value={email}
            onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full"/>
          <input type="password" placeholder="Password" value={password}
            onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full"/>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register as Customer</button>
            <Link to="/register-staff" className="underline text-blue-600 self-center">Register as Staff</Link>
            <Link to="/register-admin" className="underline text-blue-600 self-center">Register as Admin</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;