import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react';

interface TableRow {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  value: number;
  status: 'success' | 'pending' | 'failed';
}

interface DataTableProps {
  data: TableRow[];
  title: string;
}

export const DataTable: React.FC<DataTableProps> = ({ data, title }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof TableRow>('timestamp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    let filtered = data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );

    filtered.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const mult = sortDir === 'asc' ? 1 : -1;
      return aVal > bVal ? mult : -mult;
    });

    return filtered;
  }, [data, search, sortKey, sortDir]);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleSort = (key: keyof TableRow) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const exportCSV = () => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...filteredData.map(row => Object.values(row).join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-data.csv';
    a.click();
  };

  const statusColors = {
    success: 'bg-green-500/10 text-green-500',
    pending: 'bg-yellow-500/10 text-yellow-500',
    failed: 'bg-red-500/10 text-red-500'
  };

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#00d9ff] text-white rounded-lg hover:bg-[#00b8d9] transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-[#1a1d29] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d9ff]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {(['timestamp', 'event', 'user', 'value', 'status'] as const).map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortKey === key && (
                      sortDir === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className="border-b border-gray-700/50 hover:bg-[#1a1d29] transition-colors">
                <td className="px-4 py-3 text-sm text-gray-300 font-mono">{row.timestamp}</td>
                <td className="px-4 py-3 text-sm text-white">{row.event}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{row.user}</td>
                <td className="px-4 py-3 text-sm text-white font-mono">${row.value.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-400">
          Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-[#1a1d29] text-white rounded-lg disabled:opacity-50 hover:bg-[#252837] transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= filteredData.length}
            className="px-4 py-2 bg-[#1a1d29] text-white rounded-lg disabled:opacity-50 hover:bg-[#252837] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
