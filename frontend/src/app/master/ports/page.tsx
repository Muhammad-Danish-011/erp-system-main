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

export default function PortMaster() {
  const [portName, setPortName] = useState("");
  const [insurance, setInsurance] = useState(100);
  const [isActive, setIsActive] = useState(true);
  const [ports, setPorts] = useState([
    { id: 1, name: "The Port of Bridgetown", insurance: 100, active: true },
    { id: 2, name: "Durban", insurance: 100, active: true },
    { id: 3, name: "Shanghai", insurance: 100, active: true },
    { id: 4, name: "Singapore", insurance: 100, active: true },
  ]);

  const handleSave = () => {
    if (!portName.trim()) return;
    setPorts([
      ...ports,
      { id: ports.length + 1, name: portName, insurance, active: isActive },
    ]);
    setPortName("");
    setInsurance(100);
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
            setPortName("");
            setInsurance(100);
            setIsActive(true);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Form */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Port Name:</label>
        <input
          type="text"
          value={portName}
          onChange={(e) => setPortName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64"
          placeholder="Enter port name..."
        />
        <label className="text-sm font-medium">Insurance:</label>
        <input
          type="number"
          value={insurance}
          onChange={(e) => setInsurance(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-24"
        />
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
      
         <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Port ID</TableHead>
          <TableHead>Port Name</TableHead>
          <TableHead>Insurance Cost</TableHead>
          <TableHead className="text-center">Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ports.map((port) => (
          <TableRow key={port.id}>
            <TableCell>{port.id}</TableCell>
            <TableCell>{port.name}</TableCell>
            <TableCell>{port.insurance}</TableCell>
            <TableCell className="text-center">
              <Checkbox checked={port.active} disabled />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
  );
}
