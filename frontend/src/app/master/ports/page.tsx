"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";

interface Port {
  portId: number;
  portName: string;
  insuranceCost: number;
  isActive: boolean;
}

export default function PortMasterPage() {
  const [portName, setPortName] = useState("");
  const [insurance, setInsurance] = useState(100);
  const [isActive, setIsActive] = useState(true);
  const [ports, setPorts] = useState<Port[]>([]);
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch ports
  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/Ports");
      setPorts(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch ports");
    } finally {
      setLoading(false);
    }
  };

  // Save / Update
  const handleSave = async () => {
    if (!portName) {
      toast.error("Port Name is required");
      return;
    }

    const payload = {
      portName,
      insuranceCost: insurance,
      isActive,
    };

    try {
      if (selectedPort) {
        await api.patch(`/Ports/${selectedPort.portId}`, payload);
        toast.success("Port updated successfully");
      } else {
        await api.post("/Ports", payload);
        toast.success("Port added successfully");
      }
      fetchPorts();
      handleClear();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to save port");
    }
  };

  // Edit
  const handleEdit = (port: Port) => {
    setSelectedPort(port);
    setPortName(port.portName);
    setInsurance(port.insuranceCost);
    setIsActive(port.isActive);
    toast.info("Edit mode enabled ✏️");
  };

  // Delete
  const handleDelete = async () => {
    if (!selectedPort) return;
    try {
      await api.delete(`/Ports/${selectedPort.portId}`);
      toast.success("Port deleted successfully");
      fetchPorts();
      handleClear();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to delete port");
    }
  };

  // Clear form
  const handleClear = () => {
    setPortName("");
    setInsurance(100);
    setIsActive(true);
    setSelectedPort(null);
    toast.info("Form cleared 🧹");
  };

  // Filter
  const filteredPorts = ports.filter((p) =>
    p.portName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Ports</h1>

      {/* Actions */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <Button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {selectedPort ? "Update" : "Save"}
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          className="border-gray-300 hover:bg-gray-100 text-gray-700"
        >
          Clear
        </Button>
      </div>

      {/* Form */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Port Name</label>
          <Input
            value={portName}
            onChange={(e) => setPortName(e.target.value)}
            placeholder="Enter port name"
            className="w-56"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Insurance Cost</label>
          <Input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-56"
          />
        </div>

        <div className="flex items-center gap-2 mt-6 bg-[#1f2937] text-white w-[200px] p-2 rounded border border-gray-600">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked as boolean)}
          />
          <label htmlFor="isActive" className="text-sm">
            Is Active
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative mb-4 w-64">
          <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search ports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto">
          <Table data={filteredPorts}>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Port Name</TableHead>
                <TableHead>Insurance Cost</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPorts.map((port) => (
                <TableRow key={port.portId}>
                  <TableCell>{port.portId}</TableCell>
                  <TableCell>{port.portName}</TableCell>
                  <TableCell>{port.insuranceCost}</TableCell>
                  <TableCell>
                    <Checkbox checked={port.isActive} disabled />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => handleEdit(port)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
