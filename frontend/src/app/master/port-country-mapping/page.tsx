"use client";
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";

interface Mapping {
  id: number;
  countryName: string;
  portName: string;
  isActive: boolean;
}

export default function CountryPortMapping() {
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all mappings
  const fetchMappings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/CountryPortMapping");
      setMappings(res.data);
    } catch (err: any) {
      console.error("Error fetching mappings:", err);
      toast.error(err.response?.data || "Failed to fetch mappings ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMappings();
  }, []);

  // Save new mapping
  const handleSave = async () => {
    if (!country.trim() || !port.trim()) {
      toast.error("Country and port names are required");
      return;
    }

    try {
      await api.post("/CountryPortMapping", {
        countryName: country,
        portName: port,
        isActive,
      });

      toast.success("Mapping saved successfully ✅");
      fetchMappings();
      handleClear();
    } catch (err: any) {
      console.error("Error saving mapping:", err);
      toast.error(err.response?.data || "Failed to save mapping ❌");
    }
  };

  // Update mapping
  const handleUpdate = async () => {
    if (!editingId) {
      toast.error("No mapping selected for update");
      return;
    }

    try {
      await api.patch(`/CountryPortMapping/${editingId}`, {
        countryName: country,
        portName: port,
        isActive,
      });

      toast.success("Mapping updated successfully ✅");
      fetchMappings();
      handleClear();
    } catch (err: any) {
      console.error("Error updating mapping:", err);
      toast.error(err.response?.data || "Failed to update mapping ❌");
    }
  };

  // Delete mapping
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/CountryPortMapping/${id}`);
      toast.success("Mapping deleted successfully 🗑️");
      fetchMappings();
    } catch (err: any) {
      console.error("Error deleting mapping:", err);
      toast.error(err.response?.data || "Failed to delete mapping ❌");
    }
  };

  // Select Row for Edit
  const handleEdit = (mapping: Mapping) => {
    setEditingId(mapping.id);
    setCountry(mapping.countryName);
    setPort(mapping.portName);
    setIsActive(mapping.isActive);
    toast.info("Edit mode enabled ✏️");
  };

  // Clear Form
  const handleClear = () => {
    setCountry("");
    setPort("");
    setIsActive(true);
    setEditingId(null);
    toast.info("Form cleared 🧹");
  };

  // Search Filter
  const filteredMappings = mappings.filter(
    (m) =>
      m.countryName.toLowerCase().includes(search.toLowerCase()) ||
      m.portName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Port Country Mapping
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={editingId ? handleUpdate : handleSave}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {editingId ? "Update" : "Save"}
          </Button>
          <Button
            onClick={handleClear}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Clear
          </Button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Country Name:</label>
            <Input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country name..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Port Name:</label>
            <Input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port name..."
            />
          </div>

          <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-5">
            <Checkbox
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked as boolean)}
            />
            <span>Is Active</span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search mappings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Port</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMappings.length > 0 ? (
                filteredMappings.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    <TableCell>{row.countryName}</TableCell>
                    <TableCell>{row.portName}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={row.isActive} disabled />
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Button
                        onClick={() => handleEdit(row)}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(row.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    {loading ? "Loading..." : "No mappings found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
