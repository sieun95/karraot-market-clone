"use client";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <svg className="w-12 h-12 text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
            <input
              type="email"
              placeholder="n@z.com"
              className="w-full px-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Username Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full py-3 mt-6 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-800 font-medium">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
