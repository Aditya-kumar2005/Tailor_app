import React from "react";

interface Props {
  headers: string[];
  data: (string | number)[][];
}

const Table: React.FC<Props> = ({ headers, data }) => (
  <table className="table-auto w-full border">
    <thead>
      <tr className="bg-gray-200">
        {headers.map((h, i) => <th key={i}>{h}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => <td key={j}>{cell}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;