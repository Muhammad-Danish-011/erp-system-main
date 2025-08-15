"use client";
import { useState } from "react";

export default function CountryPortMapping() {
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [mappings, setMappings] = useState([
    { id: 1, country: "Tanzania", port: "Dar es Salaam", active: true },
    { id: 2, country: "Uganda", port: "Dar es Salaam", active: true },
    { id: 3, country: "Oman", port: "Salalah", active: true },
  ]);

  const handleSave = () => {
    if (!country || !port) return;
    setMappings([
      ...mappings,
      { id: mappings.length + 1, country, port, active: isActive },
    ]);
    setCountry("");
    setPort("");
    setIsActive(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
        <button
          onClick={() => {
            setCountry("");
            setPort("");
            setIsActive(true);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Form */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Select Country:</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Please Select an Option</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Uganda">Uganda</option>
          <option value="Oman">Oman</option>
          <option value="Iran">Iran</option>
        </select>

        <label className="text-sm font-medium">Select Port:</label>
        <select
          value={port}
          onChange={(e) => setPort(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Please Select an Option</option>
          <option value="Dar es Salaam">Dar es Salaam</option>
          <option value="Salalah">Salalah</option>
          <option value="Jebel Ali">Jebel Ali</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Is Active
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">Port</th>
              <th className="px-4 py-2 border">Active</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{row.country}</td>
                <td className="px-4 py-2 border">{row.port}</td>
                <td className="px-4 py-2 border text-center">
                  <input type="checkbox" checked={row.active} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
