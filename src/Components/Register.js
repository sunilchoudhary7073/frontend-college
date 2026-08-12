import React from 'react'

import logo from "../assets/logo.png"

export default function Register() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r white to-indigo-800 px-4">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={logo}
          alt="SK University"
          className="w-20 h-20"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-slate-800">
        Create Your Account
      </h1>

      <p className="text-center text-slate-500 mt-2 mb-8">
        Register to access the SK University Management System
      </p>

      {/* Form */}
      <form className="space-y-5">

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition"
        >
          Create Account
        </button>

      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <span className="text-slate-600">
          Already have an account?
        </span>

        <a
          href="/login"
          className="ml-2 text-blue-700 font-semibold hover:underline"
        >
          Login
        </a>
      </div>

    </div>

  </div>
);
}
