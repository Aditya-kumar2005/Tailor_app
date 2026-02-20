import React from "react";

interface Field {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {fields.map((f, i) => (
      <div key={i}>
        <label className="block">{f.label}</label>
        <input
          type={f.type}
          value={f.value}
          onChange={f.onChange}
          className="border p-2 w-full"
        />
      </div>
    ))}
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Submit
    </button>
  </form>
);

export default Form;