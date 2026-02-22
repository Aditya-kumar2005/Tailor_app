import React, { useState } from "react";
import  Form  from "../../components/Form";

const ProfileSettings: React.FC = () => {
  const [name, setName] = useState("Aditya");
  const [email, setEmail] = useState("aditya@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email });
  };

  return (
    <div className="p-6">
      <Form
      formname="Profile Settings"
      error=""
      fields={[
        { label: "Name", type: "text", value: name, onChange: e => setName(e.target.value) },
        // { label: "Phone", type: "text", value: phone, onChange: e => setPhone(e.target.value) },
        { label: "Email", type: "email", value: email, onChange: e => setEmail(e.target.value) }
      ]}
      onSubmit={handleSave}
      />
    </div>
  );
};

export default ProfileSettings;