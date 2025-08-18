"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";

export default function VehicleAxleMaster() {
  const [axleName, setAxleName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [axles, setAxles] = useState([
    { id: 1, name: "3 Axle", active: true },
    { id: 2, name: "2 Axle", active: true },
    { id: 3, name: "4 Axle", active: true },
    { id: 4, name: "4x2", active: true },
    { id: 5, name: "6x2", active: true },
  ]);

  const handleSave = () => {
    if (!axleName) return;
    setAxles([...axles, { id: axles.length + 1, name: axleName, active: isActive }]);
    setAxleName("");
    setIsActive(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Save
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        <button
          onClick={() => {
            setAxleName("");
            setIsActive(true);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Form */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Axle Name:</label>
        <input
          type="text"
          value={axleName}
          onChange={(e) => setAxleName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Enter axle name..."
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Is Active
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Axle ID</TableHead>
          <TableHead>Axle</TableHead>
          <TableHead className="text-center">Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {axles.map((row) => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell className="text-center">
              <Checkbox checked={row.active} disabled />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
  );
}
