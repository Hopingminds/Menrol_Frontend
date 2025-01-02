import React, { useEffect, useState } from "react";

interface ProfileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  userData: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  
}) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (isModalOpen) {
      const storedUser = localStorage.getItem("user-info");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
      }
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-50 z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[40%]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Profile Information</h2>
        {userInfo ? (
          <div>
            
            <div className="mb-4">
              <p className="text-lg">
                <strong className="text-blue-500">Phone:</strong> {userInfo.phone}
              </p>
            </div>
            {/* You can add more fields here */}
          </div>
        ) : (
          <p className="text-red-500 text-center">No user data available.</p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
