import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";

interface UserInfo {
  phone: string;
  name: string;
  email: string;
  token: string;
}

interface UserProfile {
  _id: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  isAccountBlocked: boolean;
  preferredLanguage: string;
  email: string;
  name: string;
  profileImage: string;
}

interface ProfileModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  userData: UserInfo | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  onClose,
  userData,
}) => {

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dob, setDob] = useState<string>("");



  const getProfileData = async () => {
    if (!userData?.token) {
      setError("User token is not available.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.menrol.com/api/v1/getUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setProfileData(data.user);
        setError(null);
        setName(data.user.name);
        setEmail(data.user.email);
        // Set dob to a default date if available
        setDob(data.user.dob || "");
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching profile data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      email,
      dob,
    };

    try {
      const response = await fetch("https://api.menrol.com/api/v1/editUserProfile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setProfileData(data.user);
        setError(null);
        setIsEditing(false);
        toast.success(`Profile updated successfully.`);
        onClose();
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating profile.");
      console.error(err);
    }

  };

  useEffect(() => {
    if (isModalOpen) {
      getProfileData();
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center  w-full h-full backdrop-blur-md bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white z-50 p-6 rounded-lg shadow-lg  w-[90%] md:w-[40%]"
      >
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            className="bg-blue-500 p-2 hover:bg-red-500 transition-all duration-300 rounded"
          >
            <RiCloseFill className="text-white" />
          </button>
        </div>
        <h2 className="text-2xl xsm:text-base font-semibold mb-2 -mt-5 text-center text-blue-600">
          Profile Information
        </h2>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <p className="text-red-500 text-center">{error}</p>
        )}
        {profileData ? (
          <div>
            <div className=" flex flex-col items-center justify-center">
              <div>
                {profileData.profileImage ? (
                  <Image
                    src={profileData.profileImage}
                    alt="profile"
                    height={100}
                    width={100}
                  />
                ) : (
                  <FaUserCircle className="text-6xl text-[#0054A5]" />
                )}
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                  <label htmlFor="">Name;</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    placeholder="Name"
                  />
                  <label htmlFor="">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    placeholder="Email"
                  />
                  <label htmlFor="">Enter DOB:</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="border p-2 mb-2 w-full"
                  />
                  <div className="flex justify-between items-center">
                    <button

                      type="submit"
                      className="bg-blue-500 p-2 text-white rounded"
                    >
                      Save Changes
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded hover:bg-red-500 transition-all duration-300">Go Back</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-lg xsm:text-sm">
                    <span className="text-blue-500">Name:</span>{" "}
                    <span>{profileData.name}</span>
                  </p>
                  <p className="text-lg xsm:text-sm">
                    <span className="text-blue-500">Email:</span>{" "}
                    <span>{profileData.email}</span>
                  </p>
                  <p className="text-lg xsm:text-sm ">
                    <span className="text-blue-500">Phone:</span>{" "}
                    <span>{profileData.phone}</span>
                  </p>
                  <button
                    onClick={handleEditToggle}
                    className=" bg-blue-500 text-white p-2 rounded"
                  >
                    Edit Profile
                  </button>

                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
