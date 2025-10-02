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
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";

export default function VehicleAxleMaster() {
  const [axleName, setAxleName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [axles, setAxles] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch All Axles
  const fetchAxles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/Axles");
      setAxles(res.data);
    } catch (err: any) {
      console.error("Error fetching axles:", err);
      toast.error(err.response?.data || "Failed to fetch axles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAxles();
  }, []);

  // ✅ Save New Axle
  const handleSave = async () => {
    if (!axleName.trim()) {
      toast.error("Axle name is required");
      return;
    }

    try {
      await api.post("/Axles", {
        axle: axleName,
        slug: axleName.toLowerCase().replace(/\s+/g, "-"),
        isActive,
      });

      toast.success("Axle saved successfully ✅");
      fetchAxles();
      setAxleName("");
      setIsActive(true);
    } catch (err: any) {
      console.error("Error saving axle:", err);
      toast.error(err.response?.data || "Failed to save axle ❌");
    }
  };

  // ✅ Update Axle
  const handleUpdate = async () => {
    if (!editingId) {
      toast.error("No axle selected for update");
      return;
    }

    try {
      await api.patch(`/Axles/${editingId}`, {
        axle: axleName,
        slug: axleName.toLowerCase().replace(/\s+/g, "-"),
        isActive,
      });

      toast.success("Axle updated successfully ✅");
      fetchAxles();
      setAxleName("");
      setIsActive(true);
      setEditingId(null);
    } catch (err: any) {
      console.error("Error updating axle:", err);
      toast.error(err.response?.data || "Failed to update axle ❌");
    }
  };

  // ✅ Delete Axle
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Axles/${id}`);
      toast.success("Axle deleted successfully 🗑️");
      fetchAxles();
    } catch (err: any) {
      console.error("Error deleting axle:", err);
      toast.error(err.response?.data || "Failed to delete axle ❌");
    }
  };

  // ✅ Select Row for Edit
  const handleEdit = (axle: any) => {
    setEditingId(axle.axleId);
    setAxleName(axle.axle);
    setIsActive(axle.isActive);
    toast.info("Edit mode enabled ✏️");
  };

  // ✅ Clear Form
  const handleClear = () => {
    setAxleName("");
    setIsActive(true);
    setEditingId(null);
    toast.info("Form cleared 🧹");
  };

  // ✅ Filtered Axles for Search
  const filteredAxles = axles.filter((a) =>
    a.axle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Vehicle Axle
      </h1>

      <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
        {/* Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={editingId ? handleUpdate : handleSave}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {editingId ? "Update" : "Save"}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Clear
          </button>
        </div>

        {/* Form */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Axle Name:</label>
            <Input
              type="text"
              value={axleName}
              onChange={(e) => setAxleName(e.target.value)}
              placeholder="Enter axle name..."
            />
          </div>

          <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-5 sm:mt-5">
            <Checkbox
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked as boolean)}
            />
            Is Active
          </div>
        </div>

        {/* 🔍 Search */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search axle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Axle ID</TableHead>
                <TableHead>Axle</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAxles.length > 0 ? (
                filteredAxles.map((row) => (
                  <TableRow key={row.axleId} className="hover:bg-gray-50">
                    <TableCell>{row.axleId}</TableCell>
                    <TableCell>{row.axle}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={row.isActive} disabled />
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <button
                        onClick={() => handleEdit(row)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.axleId)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    {loading ? "Loading..." : "No axles found"}
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
