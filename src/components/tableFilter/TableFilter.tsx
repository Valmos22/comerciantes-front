// import NoDataTable from '../../assets/images/NoDataResult.svg';
import type { ReactNode } from "react";
// import './TableFilter.css';

interface TableFilterProps {
  columns: string[];
  rows: (string | number)[][];
  childrenRows?: ReactNode[];
  onClickRow: (rowData: (string | number)[]) => void;
}

const TableFilter = ({
  columns = [],
  rows = [],
  childrenRows = [],
  onClickRow = () => {},
}: TableFilterProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="bg-gray-50 min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-6 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => onClickRow(row)}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-6 text-left">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {childrenRows && childrenRows.map((child, i) => <tr key={i}>{child}</tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default TableFilter;