import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import AuthLayout from "./AuthLayout";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "If an account with that email exists, a password reset link has been sent.");
    } catch {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password">
      <p className="text-center text-sm text-gray-600 mb-6">
        Enter your email and we'll send you a link to get back into your account.
      </p>
      <form className="space-y-6" onSubmit={handleReset}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
            {message}
          </div>
        )}
        {!message && (
          <>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </>
        )}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Back to Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
