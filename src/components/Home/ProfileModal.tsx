import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUserCircle,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaPen,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
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
  dob: string;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
        setDob(data.user.dob);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Update preview immediately
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData?.token) return;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profile", selectedFile);

        const uploadResponse = await fetch(
          "https://api.menrol.com/api/v1/uploadUserProfile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload profile image.");
        }

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          toast.success("Profile image updated successfully.");
          setProfileData((prev) =>
            prev ? { ...prev, profileImage: uploadData.profileImage } : null
          );
        } else {
          toast.error("Failed to update profile image.");
        }
      }

      const updatedProfile = {
        name,
        email,
        dob,
      };

      const response = await fetch(
        "https://api.menrol.com/api/v1/editUserProfile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile details.");
      }

      const data = await response.json();
      if (data.success) {
        setProfileData(data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully.");
        onClose();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating profile.");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getProfileData();
    }
  }, [isModalOpen]);

  
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-[90%]  max-w-2xl bg-white rounded-2xl shadow-2xl">
        <div className="relative p-6 border-b border-gray-200">
          <button
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <IoClose className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Profile Information
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : (
            profileData && (
              <div className="space-y-6">
                <div className="relative mx-auto w-32 h-32 group">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="New Profile Preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    ) : profileData?.profileImage ? (
                      <Image
                        src={profileData.profileImage}
                        alt="Profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 bg-[#0054A5] rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
                      <FaCamera className="h-5 w-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 xsm:text-[8px] bg-[#0054A5] text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="flex-1 px-4 py-2 xsm:text-[8px] border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <FaUserCircle className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{profileData.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <FaEnvelope className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profileData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <FaPhone className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{profileData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <FaCalendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Date Of Birth</p>
                          <p className="font-medium">
                            {new Date(profileData.dob).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleEditToggle}
                      className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaPen className="h-4 w-4" />
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
