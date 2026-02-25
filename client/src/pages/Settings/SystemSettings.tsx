import React, { useState } from "react";

const SystemSettings: React.FC = () => {
  // State for various system settings
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    smsAlerts: false,
    autoSave: true,
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would dispatch an action to update system settings
    console.log("System settings saved:", settings);
    alert("System settings updated successfully!");
  };

  const handleClearCache = () => {
    // Logic to clear application cache
    console.log("Application cache cleared.");
    alert("Cache cleared successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSaveChanges}>
          {/* --- General Settings --- */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">General</h2>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Dark Mode</h3>
                <p className="text-gray-500 text-sm">Enable or disable the dark theme.</p>
              </div>
              <label className="switch">
                <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleSettingChange} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* --- Notifications --- */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Notifications</h2>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Email Notifications</h3>
                <p className="text-gray-500 text-sm">Receive updates and alerts via email.</p>
              </div>
              <label className="switch">
                <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleSettingChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-lg font-medium text-gray-800">SMS Alerts</h3>
                <p className="text-gray-500 text-sm">Get critical alerts on your mobile phone.</p>
              </div>
              <label className="switch">
                <input type="checkbox" name="smsAlerts" checked={settings.smsAlerts} onChange={handleSettingChange} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* --- Data Management --- */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Data & Cache</h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Clear Application Cache</h3>
                <p className="text-gray-500 text-sm">Frees up storage and can resolve some issues.</p>
              </div>
              <button type="button" onClick={handleClearCache} className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600">Clear Cache</button>
            </div>
          </div>

          <div className="text-right mt-8">
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemSettings;
