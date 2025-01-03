import React, { useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { FaUserCircle } from "react-icons/fa";

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginMode: boolean;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
}



const LoginModal: React.FC<LoginModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isLoginMode,
  setIsLoginMode,
}) => {
  const [phone, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.menrol.com/api/v1/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("OTP sent:", data);
        setOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP send:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.menrol.com/api/v1/verifyUserOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();
      if (response.ok && data.token) {
        const userInfo = { token: data.token, phone };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage")); // Notify state change
        setIsModalOpen(false);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-lg w-1/3"
          >
            <h2 className="text-lg font-semibold mb-4">
              {otpSent ? "Verify OTP" : isLoginMode ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
              {!otpSent ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Enter the OTP"
                    required
                  />
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
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
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {loading
                    ? otpSent
                      ? "Verifying..."
                      : "Sending OTP..."
                    : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </button>
              </div>
            </form>
            {!otpSent && (
              <p className="mt-4 text-sm">
                {isLoginMode
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                >
                  {isLoginMode ? "Sign Up" : "Login"}
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default LoginModal