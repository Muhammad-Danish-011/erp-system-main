"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";
import Loading from "@/components/ui/Loading";

interface Color {
  colorId: number;
  colorName: string;
  hex: string;
  isActive: boolean;
}

export default function CarColorMaster() {
  const [colors, setColors] = useState<Color[]>([]);
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#FFE4C9");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch all colors
  const fetchColors = async () => {
    try {
      setLoading(true);
      const res = await api.get<Color[]>("/Colors");
      setColors(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch colors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // 🔹 Filter colors based on search
  const filteredColors = colors.filter(color => 
    color.colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.hex.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Save new color
  const handleSave = async () => {
    if (!colorName.trim()) return toast.error("Color name is required");
    try {
      setLoading(true);
      const payload = { colorName, hex: hexCode, isActive };
      const res = await api.post<Color>("/Colors", payload);
      setColors((prev) => [...prev, res.data]);
      toast.success("Color added successfully!");
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to add color");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update color
  const handleUpdate = async () => {
    if (editingId === null || !colorName.trim()) return toast.error("Color name is required");
    try {
      setLoading(true);
      const payload = { colorName, hex: hexCode, isActive };
      await api.patch(`/Colors/${editingId}`, payload);
      setColors((prev) =>
        prev.map((c) =>
          c.colorId === editingId
            ? { ...c, colorName, hex: hexCode, isActive }
            : c
        )
      );
      toast.success("Color updated successfully!");
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to update color");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete color
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this color?")) return;
    try {
      setLoading(true);
      await api.delete(`/Colors/${id}`);
      setColors((prev) => prev.filter((c) => c.colorId !== id));
      toast.success("Color deleted successfully!");
      if (editingId === id) resetForm();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to delete color");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle Active status
  const toggleActive = async (color: Color) => {
    try {
      setLoading(true);
      await api.patch(`/Colors/${color.colorId}`, { colorName: color.colorName, hex: color.hex, isActive: !color.isActive });
      setColors((prev) =>
        prev.map((c) => (c.colorId === color.colorId ? { ...c, isActive: !c.isActive } : c))
      );
      toast.success("Color status updated!");
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to toggle status");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Start editing
  const startEditing = (color: Color) => {
    setEditingId(color.colorId);
    setColorName(color.colorName);
    setHexCode(color.hex);
    setIsActive(color.isActive);
  };

  const resetForm = () => {
    setEditingId(null);
    setColorName("");
    setHexCode("#FFE4C9");
    setIsActive(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Colors Master</h1>

      {/* Search Box */}
   

      {/* Input + Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end bg-white p-4 rounded shadow">
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">Color Name:</label>
          <Input
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Enter color name"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">Hex Code:</label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="h-10 w-20 p-0"
            />
            <Input
              type="text"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="h-10"
              placeholder="Enter hex code"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#1f2937] px-2 py-2 rounded border border-gray-600 text-white self-end">
          <Checkbox
            checked={isActive}
            onCheckedChange={(val) => setIsActive(val)}
          />
          <label className="text-sm font-medium text-white">Is Active</label>
        </div>
        

        <div className="flex flex-wrap gap-2 col-span-3">
          {editingId ? (
            <>
              <Button onClick={handleUpdate} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">Update</Button>
              <Button onClick={resetForm} disabled={loading} className="bg-gray-600 hover:bg-gray-700 text-white">Cancel</Button>
            </>
          ) : (
            <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          )}
          <Button onClick={resetForm} disabled={loading} className="bg-gray-400 hover:bg-gray-500 text-white">Clear</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded bg-white p-4">
           <div className="mb-4">
        <Input
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white"
        />
      </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color ID</TableHead>
              <TableHead>Color Name</TableHead>
              <TableHead>Hex Code</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColors.map((color) => (
              <TableRow key={color.colorId} className="hover:bg-gray-50">
                <TableCell>{color.colorId}</TableCell>
                <TableCell>{color.colorName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded border" style={{ backgroundColor: color.hex }}></span>
                    {color.hex}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={color.isActive}
                    onCheckedChange={() => toggleActive(color)}
                    disabled={loading}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => startEditing(color)} disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white">Edit</Button>
                  <Button onClick={() => handleDelete(color.colorId)} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
