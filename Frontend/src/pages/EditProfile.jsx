import React, { useContext, useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';
import uploadImage from '../utils/uploadimage';
import { UserContext } from '../context/userContenxt';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let profileImageUrl = user?.profileImageUrl || "";

      // Upload new image if selected
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || profileImageUrl;
      }

      const updateData = {
        name: fullName,
        email,
        profileImageUrl,
      };

      // Only include password if user wants to change it
      if (newPassword) {
        updateData.password = newPassword;
      }

      const response = await axiosInstance.put(API_PATH.AUTH.UPDATE_PROFILE, updateData);

      // Update local user context
      if (response.data) {
        const { token, ...userData } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        updateUser(response.data);
      }

      setSuccess("Profile updated successfully!");
      showSuccessToast("Profile updated successfully!");
      setNewPassword("");
      setCurrentPassword("");
      setProfilePic(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Something went wrong, please try again later";
      setError(errorMsg);
      showErrorToast(errorMsg);
    }
  };

  const handleBack = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <DashboardLayout activeMenu="Edit Profile">
      <div className="max-w-xl mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Edit Profile
          </h1>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
            Update your personal information and profile photo
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
          <form onSubmit={handleUpdateProfile}>
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-4">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
                currentImage={user?.profileImageUrl}
              />
              <p className="text-xs text-gray-400 dark:text-dark-text-secondary mt-2">
                Click to change profile photo
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Full Name
                </label>
                <input
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                  value={fullName}
                  onChange={({ target }) => setFullName(target.value)}
                  type="text"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  type="email"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-dark-border pt-4">
                <p className="text-xs font-medium text-gray-500 dark:text-dark-text-secondary mb-3">
                  Change Password <span className="text-gray-400 font-normal">(Optional)</span>
                </p>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    New Password
                  </label>
                  <input
                    placeholder="Enter new password (min 8 characters)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                    type="password"
                  />
                  <p className="text-xs text-gray-400 dark:text-dark-text-secondary mt-1">
                    Leave empty to keep current password
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-lg mt-4">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium px-4 py-2 rounded-lg mt-4">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-dark-border">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 dark:text-dark-text-secondary font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface-2 transition text-sm"
                onClick={handleBack}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition disabled:opacity-50 text-sm"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
