"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";

interface Option {
  optionId: number;
  optionName: string;
  isActive: boolean;
  createdOn: string;
  createdBy: number;
  insertedTerminal: string;
  insertedTerminalIP: string;
  updatedBy?: number;
  updatedTerminal?: string;
  updatedTerminalIP?: string;
  updatedOn?: string;
}

const OptionsMaster: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [carOptionName, setCarOptionName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editOptionName, setEditOptionName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load options from backend
  const fetchOptions = async () => {
    try {
      setLoading(true);
      const res = await api.get<Option[]>("/CarOptions");
      setOptions(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch options");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  // 🔹 Save new option
  const handleSave = async () => {
    if (!carOptionName.trim()) return toast.error("Option name is required");
    try {
      setLoading(true);
      const payload = { optionName: carOptionName, isActive };
      const res = await api.post<Option>("/CarOptions", payload);
      setOptions((prev) => [...prev, res.data]);
      setCarOptionName("");
      setIsActive(true);
      toast.success("Option added successfully!");
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to add option");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Start editing
  const startEditing = (option: Option) => {
    setEditingId(option.optionId);
    setEditOptionName(option.optionName);
    setIsActive(option.isActive);
  };

  // 🔹 Update option
  const handleUpdate = async () => {
    if (editingId === null || !editOptionName.trim()) return toast.error("Option name is required");
    try {
      setLoading(true);
      const payload = { optionName: editOptionName, isActive };
      await api.patch(`/CarOptions/${editingId}`, payload);
      setOptions((prev) =>
        prev.map((opt) =>
          opt.optionId === editingId
            ? { ...opt, optionName: editOptionName, isActive }
            : opt
        )
      );
      toast.success("Option updated successfully!");
      cancelEditing();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to update option");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete option
  const handleDelete = async (optionId: number) => {
    if (!confirm("Are you sure you want to delete this option?")) return;
    try {
      setLoading(true);
      await api.delete(`/CarOptions/${optionId}`);
      setOptions((prev) => prev.filter((opt) => opt.optionId !== optionId));
      toast.success("Option deleted successfully!");
      if (editingId === optionId) cancelEditing();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to delete option");
    } finally {
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditOptionName("");
    setCarOptionName("");
    setIsActive(true);
  };

  // 🔹 Toggle Active status
  const toggleActive = async (opt: Option) => {
    try {
      setLoading(true);
      await api.patch(`/CarOptions/${opt.optionId}`, {
        optionName: opt.optionName,
        isActive: !opt.isActive,
      });
      setOptions((prev) =>
        prev.map((o) =>
          o.optionId === opt.optionId
            ? { ...o, isActive: !o.isActive }
            : o
        )
      );
      toast.success("Option status updated!");
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to toggle active status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Additional Options Master
      </h1>

      {/* Input + Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end bg-white p-4 rounded shadow">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            Car Option:
          </label>
          <Input
            value={editingId ? editOptionName : carOptionName}
            onChange={(e) =>
              editingId
                ? setEditOptionName(e.target.value)
                : setCarOptionName(e.target.value)
            }
            placeholder="Enter option name"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#1f2937] px-2 py-2 rounded border border-gray-600 text-white">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={() => setIsActive(!isActive)}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-white">
            Is Active
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {editingId ? (
            <>
              <Button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                Update
              </Button>
              <Button
                onClick={cancelEditing}
                className="bg-gray-600 hover:bg-gray-700 text-white"
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-600 rounded-lg overflow-x-auto mt-4 bg-white p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">OptionId</TableHead>
              <TableHead>Option Name</TableHead>
              <TableHead className="w-24">Active</TableHead>
              <TableHead className="w-48">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((opt) => (
              <TableRow key={opt.optionId} className="bg-white hover:bg-gray-100">
                <TableCell>{opt.optionId}</TableCell>
                <TableCell>{opt.optionName}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={opt.isActive}
                    onCheckedChange={() => toggleActive(opt)}
                    disabled={loading}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => startEditing(opt)}
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(opt.optionId)}
                    disabled={loading}
                                        className="bg-red-600 hover:bg-red-700 text-white"

                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OptionsMaster;
