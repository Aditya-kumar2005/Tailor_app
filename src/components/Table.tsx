import React from "react";

interface Props {
  Name:string;
  headers: string[];
  data: (string | number)[][];
}

const Table: React.FC<Props> = ({Name, headers, data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-blue-600">{Name}</h2>
  <table className="table-auto w-full border">
    <thead>
      <tr className="bg-blue-600 text-white text-2xl">
        {headers.map((h, i) => <th key={i}>{h}</th>)}
      </tr>
    </thead>
    <tbody className="p-3 text-center text-black text-xl">
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => <td key={j}>{cell}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

export default Table;