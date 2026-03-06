// import React from 'react';

// // --- Type Definitions for Generic Table ---

// // Defines a single column in the table.
// // 'T' is the type of the data object for each row.
// export interface Column<T> {
//   header: string; // The text to display in the table header
//   accessor: keyof T; // The key of the data object to access for this column's cell data
//   // Optional: A custom render function for the cell. 
//   // This provides full flexibility to render JSX, buttons, links, etc.
//   render?: (row: T) => React.ReactNode;
// }

// // Defines the props for the generic Table component.
// interface TableProps<T> {
//   title: string; // The title to display above the table
//   columns: Column<T>[]; // The column definitions
//   data: T[]; // The array of data objects
//   // Optional: A message to display when there is no data
//   emptyStateMessage?: string;
// }

// /**
//  * A generic, responsive, and reusable Table component.
//  * It supports type-safe data, custom cell rendering, and a clean UI.
//  */
// const Table = <T extends Record<string,unknown>>({
//   title, 
//   columns, 
//   data=[], 
//   emptyStateMessage = "No records found."
// }: TableProps<T>) => {

//   // --- Render Logic ---

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
//       <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-max text-sm text-left text-gray-600">
          
//           {/* --- Table Header --- */}
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//             <tr>
//               {columns.map((col) => (
//                 <th key={String(col.accessor)} scope="col" className="px-6 py-3 font-semibold">
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* --- Table Body --- */}
//           <tbody>
//             {Array.isArray(data) && data.length > 0 ? (
//               data.map((row, rowIndex) => (
//                 <tr key={String((row as any).id  ?? rowIndex)} className="bg-white border-b hover:bg-gray-50">
//                   {columns.map((col) => (
//                     <td key={String(col.accessor)} className="px-6 py-4">
//                       {
//                         // Use the custom render function if it exists for the column,
//                         // otherwise, display the data using the accessor.
//                         col.render ? col.render(row) : <span>{String(row[col.accessor] ?? '')}</span>
//                       }
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               // --- Empty State --- 
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-10">
//                   <div className="flex flex-col items-center">
//                     <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
//                     <p className="font-semibold text-lg text-gray-600">{emptyStateMessage}</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;

import React from 'react';

// --- Type Definitions for Generic Table ---

// Defines a single column in the table.
// 'T' is the type of the data object for each row.
export interface Column<T> {
  header: string; // The text to display in the table header
  accessor: keyof T; // The key of the data object to access for this column's cell data
  // Optional: A custom render function for the cell. 
  // This provides full flexibility to render JSX, buttons, links, etc.
  render?: (row: T) => React.ReactNode;
}

// Defines the props for the generic Table component.
interface TableProps<T> {
  title: string; // The title to display above the table
  columns: Column<T>[]; // The column definitions
  data: T[]; // The array of data objects
  // Optional: A message to display when there is no data
  emptyStateMessage?: string;
}

/**
 * A generic, responsive, and reusable Table component.
 * It supports type-safe data, custom cell rendering, and a clean UI.
 */
const Table = <T extends { id?: string | number }>({
  title, 
  columns, 
  data = [], 
  emptyStateMessage = "No records found."
}: TableProps<T>) => {

  // --- Render Logic ---

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm text-left text-gray-600 border-collapse">
          
          {/* --- Table Header --- */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th 
                  key={String(col.accessor)} 
                  scope="col" 
                  className="px-6 py-3 font-semibold"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* --- Table Body --- */}
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id ?? rowIndex} 
                  className="bg-white border-b hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td key={String(col.accessor)} className="px-6 py-4">
                      {
                        // Use the custom render function if it exists for the column,
                        // otherwise, display the data using the accessor.
                        col.render 
                          ? col.render(row) 
                          : <span>{String(row[col.accessor] ?? '')}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // --- Empty State --- 
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  <div className="flex flex-col items-center">
                    <svg 
                      className="w-16 h-16 text-gray-400 mb-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="font-semibold text-lg text-gray-600">
                      {emptyStateMessage}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table;
