import React from "react";

interface Field {
  label: string;
  type: string;
  value: string | number ;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  formname:string;
  error:string;
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<Props> = ({ formname, error, fields, onSubmit }) => (
  <div className="flex flex-col items-center justify-center p-8 border-2 rounded shadow-lg w-full max-w-full mx-auto">
    <h1 className="text-4xl font-bold text-blue-500 mb-4">{formname}</h1>
    {error && (
      <p className="text-red-600 font-medium mb-4 bg-red-100 px-4 py-2 rounded-lg shadow-sm">
        {error}
      </p>
    )}
    <form onSubmit={onSubmit} className="space-y-6 w-full">
      {fields.map((f, i) => (
        <div key={i} className="flex flex-col">
          <label className="text-2xl text-blue-500 font-semibold mb-2">{f.label}</label>
          <input
            type={f.type}
            value={f.value}
            onChange={f.onChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200"
          />
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-50 h-13 rounded-lg bg-blue-600 text-xl text-white font-bold hover:bg-white hover:text-blue-600 hover:border-2"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);


export default Form;