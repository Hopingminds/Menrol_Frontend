import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BsTelephone } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginMode: boolean;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isModalOpen,
  setIsModalOpen,
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
        setOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);   // Indicate loading
    setError(null);     // Clear previous errors

    try {
      const response = await fetch("https://api.menrol.com/api/v1/verifyUserOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store user info in localStorage
        const userInfo = { token: data.token, phone };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));

        toast.success("Login Successful!");

        // Reload the page to reflect DOM updates
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Allow time for the toast to be visible
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };


  return (
    <>
      <ToastContainer />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg w-[480px] relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>

            <div className="p-8">
              {/* Phone Icon and Title */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BsTelephone size={32} className="font-extrabold" />
                </div>
                <h2 className="text-2xl font-semibold">
                  Enter your phone number
                </h2>
                <p className="text-gray-500 mt-2">
                  We will send you a text with a verification code.
                </p>
              </div>

              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                {!otpSent ? (
                  <div className="mb-6">
                    <div className="flex border rounded-lg overflow-hidden">
                      <select className="px-3 py-3 bg-gray-50 border-r">
                        <option>+91</option>
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="flex-1 px-4 py-3 focus:outline-none"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter verification code"
                        required
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0054A5] text-white py-3 rounded-lg font-medium hover:[#0054A5] transition-colors disabled:opacity-50"
                >
                  {loading
                    ? otpSent
                      ? "Verifying..."
                      : "Sending..."
                    : otpSent
                      ? "Enter verification code"
                      : "Get verification code"}
                </button>
              </form>

              {/* Terms and conditions */}
              {/* <div className="mt-6 text-center text-sm text-gray-500">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#0054A5] hover:underline">
                  Terms
                </a>{" "}
                &{" "}
                <a href="#" className="text-[#0054A5] hover:underline">
                  Privacy Policy
                </a>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;