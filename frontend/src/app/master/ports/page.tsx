"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [ports, setPorts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://localhost:7215/api/Ports"; // backend ka endpoint
  const token =
    "PASTE_YOUR_JWT_TOKEN"; // JWT token swagger se ya login se lo

  // Get All Ports
  const fetchPorts = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPorts(res.data);
    } catch (err) {
      console.error("Error fetching ports:", err);
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  // Create Port
  const handleSave = async () => {
    if (!portName.trim()) return;
    try {
      await axios.post(
        API_URL,
        {
          portName,
          isActive,
          insuranceCost: insurance,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPorts(); // refresh list
      clearForm();
    } catch (err) {
      console.error("Error saving port:", err);
    }
  };

  // Update Port
  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      await axios.patch(
        `${API_URL}/${selectedId}`,
        {
          portName,
          isActive,
          insuranceCost: insurance,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPorts();
      clearForm();
    } catch (err) {
      console.error("Error updating port:", err);
    }
  };

  // Delete Port
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await axios.delete(`${API_URL}/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPorts();
      clearForm();
    } catch (err) {
      console.error("Error deleting port:", err);
    }
  };

  // Select port row
  const handleRowClick = (port: any) => {
    setSelectedId(port.portId);
    setPortName(port.portName);
    setInsurance(port.insuranceCost || 100);
    setIsActive(port.isActive);
  };

  // Clear form
  const clearForm = () => {
    setSelectedId(null);
    setPortName("");
    setInsurance(100);
    setIsActive(true);
  };

  // Filter ports based on search
  const filteredPorts = ports.filter(port => 
    port.portName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Ports</h1>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search ports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={clearForm}
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
              {filteredPorts.map((port) => (
                <TableRow
                  key={port.portId}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(port)}
                >
                  <TableCell>{port.portId}</TableCell>
                  <TableCell>{port.portName}</TableCell>
                  <TableCell>{port.insuranceCost}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={port.isActive} disabled />
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
