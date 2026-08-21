import React, { useState } from 'react';
import{ForgetePassword as ForgetePasswordApi , VerifyForgotEmail,} from '../../Service/frontend/login'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('verify'); // 'verify' | 'reset' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ----- Step 1: Verify Email -----
const handleVerify = async (e) => {
  e.preventDefault();
  setError("");

  if (!email.trim()) {
    setError("Email is required.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    setError("Please enter a valid email address.");
    return;
  }

  setLoading(true);

  try {
    const res = await VerifyForgotEmail(email.trim());

    console.log("Forgot Password Response:", res);

    if (res?.success || res?.status) {
      setStep("reset");
    } else {
      setError(res?.message || "Email verification failed.");
    }

  } catch (err) {
    console.log("Forgot Password Error:", err);

    setError(
      err?.response?.data?.message ||
      "Email verification failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  // ----- Step 2: Reset Password -----
const handleReset = async (e) => {
  e.preventDefault();
  setError("");

  if (!password.trim()) {
    setError("Password is required.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    console.log("Email:", email);
    console.log("New Password:", password);

    const res = await ForgetePasswordApi(
      email.trim(),
      password
    );

    console.log("Reset Password Response:", res);

    if (res?.success) {
      setStep("success");
    } else {
      setError(res?.message || "Failed to reset password.");
    }

  } catch (err) {
    console.log("Reset Password Error:", err);

    setError(
      err?.response?.data?.message ||
      "Failed to reset password. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  // ----- Render -----
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100/60 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-blue-200/50 p-8 sm:p-10 border border-white/80 transition-all">

        {/* Icon – changes based on step */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ring-8 ${
            step === 'success'
              ? 'bg-emerald-100 ring-emerald-50'
              : 'bg-blue-50 ring-blue-50/60'
          }`}>
            <i className={`${
              step === 'success'
                ? 'fas fa-check-circle text-emerald-500 text-3xl'
                : 'fas fa-lock text-blue-600 text-2xl'
            }`}></i>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 tracking-tight">
          {step === 'verify' && 'Forgot Password?'}
          {step === 'reset' && 'Set New Password'}
          {step === 'success' && 'Password Reset!'}
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2 mb-8">
          {step === 'verify' && 'Enter your email to verify your identity.'}
          {step === 'reset' && 'Choose a new password for your account.'}
          {step === 'success' && 'Your password has been reset successfully.'}
        </p>

        {/* ---- STEP 1: Verify Email ---- */}
        {step === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                <i className="fas fa-envelope text-blue-500 mr-2"></i> Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-gray-50/80 hover:bg-white"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-blue-200 transition duration-200 flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Verify Email
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              <i className="fas fa-arrow-left mr-1"></i>
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                Back to Login
              </a>
            </p>
          </form>
        )}

        {/* ---- STEP 2: Reset Password ---- */}
        {step === 'reset' && (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                <i className="fas fa-lock text-blue-500 mr-2"></i> New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-gray-50/80 hover:bg-white"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-1.5">
                <i className="fas fa-check-circle text-blue-500 mr-2"></i> Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-gray-50/80 hover:bg-white"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-blue-200 transition duration-200 flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                <>
                  <i className="fas fa-key"></i> Reset Password
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              <i className="fas fa-arrow-left mr-1"></i>
              <button
                type="button"
                onClick={() => { setStep('verify'); setError(''); setEmail(''); }}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Back to Email Verification
              </button>
              <span className="mx-2 text-gray-300">|</span>
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                Back to Login
              </a>
            </p>
          </form>
        )}

        {/* ---- SUCCESS ---- */}
        {step === 'success' && (
          <div className="text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center ring-8 ring-emerald-50">
                <i className="fas fa-check-circle text-emerald-500 text-4xl"></i>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800">Password Reset Successful</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Your password has been changed. You can now log in with your new password.
            </p>

            <a
              href="/login"
              className="inline-block w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl shadow-md transition text-center"
            >
              <i className="fas fa-sign-in-alt mr-2"></i> Back to Login
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;