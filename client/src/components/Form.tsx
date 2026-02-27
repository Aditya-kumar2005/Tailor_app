import React from "react";

// Defines the structure for a single form field
interface Field {
  id: string; // Unique ID to link label and input
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  control?: 'input' | 'textarea' | 'select'; // Type of form control
  type?: string; // e.g., 'text', 'password', 'number', 'email'
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[]; // For select inputs
}

// Defines the props for the reusable Form component
interface Props {
  formName: string;
  error?: string;
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
  submitText?: string; // Customizable text for the submit button
}

const Form: React.FC<Props> = ({ formName, error, fields, onSubmit, submitText = "Submit" }) => {

  const renderField = (field: Field) => {
    const commonProps = {
      id: field.id,
      name:field.id,
      value: field.value,
      onChange: field.onChange,
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200 bg-gray-50"
    };

    switch (field.control) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      case 'select':
        return (
          <select {...commonProps}>
            {field.placeholder && <option value="" disabled>{field.placeholder}</option>}
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case 'input':
      default:
        return <input type={field.type || 'text'} {...commonProps} />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg border">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">{formName}</h2>
      
      {error && (
        <p className="text-red-600 font-medium text-center mb-4 bg-red-100 px-4 py-2 rounded-lg shadow-sm">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {fields.map(field => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="text-lg font-semibold text-gray-700 mb-2">{field.label}</label>
            {renderField(field)}
          </div>
        ))}
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-blue-600 text-lg text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
