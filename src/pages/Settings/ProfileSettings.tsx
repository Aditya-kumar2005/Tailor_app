import React, { useState } from "react";

const ProfileSettings: React.FC = () => {
  const [name, setName] = useState("Aditya");
  const [email, setEmail] = useState("aditya@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSave}>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full mb-2"/>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default ProfileSettings;