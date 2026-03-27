import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import uploadImage from '../../utils/uploadimage';
import { showSuccessToast, showErrorToast } from '../../utils/toast';

const CreateUser = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      await axiosInstance.post(API_PATH.USERS.CREATE_USER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      setLoading(false);
      showSuccessToast("User created successfully!");
      navigate('/admin/users');
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Something went wrong, please try again later";
      setError(errorMsg);
      showErrorToast(errorMsg);
    }
  };

  const clearData = () => {
    setProfilePic(null);
    setFullName("");
    setEmail("");
    setPassword("");
    setAdminInviteToken("");
    setError(null);
  };

  return (
    <DashboardLayout activeMenu="Add User">
      <div className="max-w-xl mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Add New User
          </h1>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
            Fill in the details to create a new team member
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
          <form onSubmit={handleCreateUser}>
            {/* Profile Photo */}
            <div className="flex justify-center mb-4">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
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

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Password
                </label>
                <input
                  placeholder="Min 8 characters"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  type="password"
                />
              </div>

              {/* Admin Invite Token */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Admin Invite Token <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  placeholder="Enter 6 digit code to make admin"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                  value={adminInviteToken}
                  onChange={({ target }) => setAdminInviteToken(target.value)}
                  type="text"
                />
                <p className="text-xs text-gray-400 dark:text-dark-text-secondary mt-1">
                  Leave empty to create as Member, enter token to create as Admin
                </p>
              </div>
            </div>

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
                onClick={() => navigate('/admin/users')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition disabled:opacity-50 text-sm"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateUser;
