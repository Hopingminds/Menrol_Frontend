import React from "react";

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginMode: boolean;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop type
}

const LoginModal: React.FC<LoginModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isLoginMode,
  setIsLoginMode, // Accept the setIsLoginMode function
}) => {
  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to parent
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
          >
            {isLoginMode ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Login</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p className="mt-4 text-sm">
                  Don't have an account?{" "}
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setIsLoginMode(false)} // Use setIsLoginMode here
                  >
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">Sign In</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="mt-4 text-sm">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setIsLoginMode(true)} // Use setIsLoginMode here
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
