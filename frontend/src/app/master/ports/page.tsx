"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
  <>
         <h1 className="text-3xl font-bold text-center mb-8 text-white">Ports</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex-1 ">
          <label className="block text-sm font-medium mb-1 ">Port Name:</label>
          <Input
            value={portName}
            onChange={(e) => setPortName(e.target.value)}
            placeholder="Enter port name..."
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Insurance:</label>
          <Input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(Number(e.target.value))}
            // className="border border-gray-300 rounded px-3 py-2 w-24"
          />
        </div>

        <div className="bg-[#1f2937] text-white px-2 py-2 mt-0 md:mt-5 rounded border border-gray-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Is Active
          </label>
        </div>
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
  </>
  );
}
