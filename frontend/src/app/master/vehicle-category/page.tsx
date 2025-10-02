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

export default function VehicleCategoryMaster() {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/Category");
      setCategories(res.data);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      toast.error(err.response?.data || "Failed to fetch categories ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Save New Category
  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await api.post("/Category", {
        category: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        isActive,
      });

      toast.success("Category saved successfully ✅");
      fetchCategories();
      setCategoryName("");
      setIsActive(true);
    } catch (err: any) {
      console.error("Error saving category:", err);
      toast.error(err.response?.data || "Failed to save category ❌");
    }
  };

  // ✅ Update Category
  const handleUpdate = async () => {
    if (!editingId) {
      toast.error("No category selected for update");
      return;
    }

    try {
      await api.patch(`/Category/${editingId}`, {
        category: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        isActive,
      });

      toast.success("Category updated successfully ✅");
      fetchCategories();
      setCategoryName("");
      setIsActive(true);
      setEditingId(null);
    } catch (err: any) {
      console.error("Error updating category:", err);
      toast.error(err.response?.data || "Failed to update category ❌");
    }
  };

  // ✅ Delete Category
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Category/${id}`);
      toast.success("Category deleted successfully 🗑️");
      fetchCategories();
    } catch (err: any) {
      console.error("Error deleting category:", err);
      toast.error(err.response?.data || "Failed to delete category ❌");
    }
  };

  // ✅ Select Row for Edit
  const handleEdit = (cat: any) => {
    setEditingId(cat.categoryId);
    setCategoryName(cat.category);
    setIsActive(cat.isActive);
    toast.info("Edit mode enabled ✏️");
  };

  // ✅ Clear Form
  const handleClear = () => {
    setCategoryName("");
    setIsActive(true);
    setEditingId(null);
    toast.info("Form cleared 🧹");
  };

  // ✅ Search Filter
  const filteredCategories = categories.filter((c) =>
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Vehicle Category
      </h1>

      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
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
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Category Name:</label>
            <Input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name..."
            />
          </div>

          <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-5">
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
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((row) => (
                  <TableRow key={row.categoryId} className="hover:bg-gray-50">
                    <TableCell>{row.categoryId}</TableCell>
                    <TableCell>{row.category}</TableCell>
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
                        onClick={() => handleDelete(row.categoryId)}
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
                    {loading ? "Loading..." : "No categories found"}
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
