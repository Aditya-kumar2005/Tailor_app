import React, { useState } from "react";

const SystemSettings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("System settings updated:", { notifications });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <form onSubmit={handleSave}>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={notifications}
            onChange={(e)=>setNotifications(e.target.checked)} />
          <span>Enable Notifications</span>
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-4">Save</button>
      </form>
    </div>
  );
};

export default SystemSettings;