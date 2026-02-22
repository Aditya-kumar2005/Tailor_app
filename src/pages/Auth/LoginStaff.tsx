import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { login } from "../../slices/userSlice";
import type { RootState } from "../../store";

const LoginStaff: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/tailor");
    }
  }, [user.loggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await api.post("/login", { email, password });
      const { user: userProfile, token } = res.data;
      // Only allow Staff or Admin to access this portal
      if (!userProfile || (userProfile.role !== "Staff" && userProfile.role !== "Admin")) {
        setError("You are not authorized to sign in to the staff portal.");
        return;
      }
      localStorage.setItem('token', token);
      dispatch(login({ profile: userProfile, token }));
      navigate("/tailor");
    } catch (err) {
      const message = (err as any)?.response?.data?.error || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Staff Login</h2>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="password" placeholder="Password" value={password}
          onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign in as Staff</button>
      </form>
    </div>
  );
};

export default LoginStaff;
