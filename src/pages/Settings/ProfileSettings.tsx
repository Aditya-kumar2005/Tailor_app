import React, { useState } from "react";

const ProfileSettings: React.FC = () => {
  // State for user profile data
  const [profile, setProfile] = useState({
    name: "Aditya Kumar",
    email: "aditya.kumar@example.com",
    bio: "Software developer and tech enthusiast.",
    avatar: "https://via.placeholder.com/150", // Placeholder image
  });

  // State for password change
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically dispatch an action to update the user's profile
    console.log("Profile saved:", profile);
    alert("Profile updated successfully!");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New passwords do not match.");
      return;
    }
    // Here you would dispatch an action to update the user's password
    console.log("Password change requested.");
    alert("Password updated successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* --- Personal Information Section --- */}
        <form onSubmit={handleProfileSave}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          
          {/* Profile Picture Upload */}
          <div className="flex items-center mb-6">
            <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
            <input type="file" className="ml-6" />
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio/About Me */}
          <div className="mb-6">
            <label htmlFor="bio" className="block text-gray-600 font-medium mb-2">About Me</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={profile.bio}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Profile</button>
        </form>

        <hr className="my-8" />

        {/* --- Security & Password Section --- */}
        <form onSubmit={handlePasswordSave}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Security & Password</h2>

          <div className="mb-4">
            <label htmlFor="current-password">Current Password</label>
            <input type="password" id="current-password" name="current" value={password.current} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="mb-4">
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" name="new" value={password.new} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input type="password" id="confirm-password" name="confirm" value={password.confirm} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
