// ...existing code...
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { login } from "../../slices/userSlice";
import type { RootState } from "../../store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // if already logged in, redirect immediately
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/dashboard");
    }
  }, [user.loggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await api.post("/login", { email, password });
      dispatch(login(res.data));
      navigate("/dashboard");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (err as any)?.response?.data?.error || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="password" placeholder="Password" value={password}
          onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
// ...existing code...