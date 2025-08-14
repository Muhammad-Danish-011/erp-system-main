"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function VehicleCategoryMaster() {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const [categories, setCategories] = useState([
    { id: 1, name: "Test", active: false },
    { id: 2, name: "Tipper", active: true },
    { id: 3, name: "Tractor Head", active: true },
    { id: 4, name: "Flat Body", active: true },
    { id: 5, name: "Chassis", active: true },
    { id: 6, name: "BOX TRUCK", active: true },
    { id: 7, name: "Concrete Pump", active: true },
    { id: 8, name: "Refrigerator Body", active: true },
    { id: 9, name: "Stake Body", active: true },
    { id: 10, name: "Dumper truck", active: true },
    { id: 11, name: "Concrete Mixer", active: true },
    { id: 12, name: "Tank Truck", active: true },
    { id: 13, name: "Crane Truck", active: true },
    { id: 14, name: "Jumbo Truck", active: true },
    { id: 15, name: "Truck-mounted crane", active: true },
    { id: 16, name: "Tow Truck", active: true },
    { id: 17, name: "Suitcase Body", active: true },
    { id: 18, name: "Backload", active: true }
  ]);

  const handleSave = () => {
    if (categoryName.trim()) {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { id: newId, name: categoryName, active: isActive }]);
      setCategoryName("");
    }
  };

  const handleUpdate = () => {
    if (editingId !== null && editValue.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, name: editValue } : cat
      ));
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleClear = () => {
    setCategoryName("");
    setIsActive(true);
    setEditingId(null);
    setEditValue("");
  };

  const startEditing = (id: number, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Vehicle Category Master</h1>

      <div className="flex gap-2 mb-6">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
        <Button 
          onClick={handleUpdate} 
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={editingId === null}
        >
          Update
        </Button>
        <Button onClick={handleClear} className="bg-gray-600 hover:bg-gray-700 text-white">
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-white">Category Name:</label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div><br /><br /><br />
        <div className="flex items-center gap-2 bg-white p-2 rounded">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={() => setIsActive(!isActive)}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-900">
            Is Active
          </label>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-24">Category ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-24">Active</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
             <TableRow 
  key={category.id} 
  className="bg-white hover:bg-gray-100"
>

                <TableCell>{category.id}</TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={category.active}
                    onCheckedChange={() => {
                      setCategories(categories.map(cat => 
                        cat.id === category.id ? { ...cat, active: !cat.active } : cat
                      ));
                    }}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  {editingId === category.id ? (
                    <>
                      <Button
                        onClick={() => handleUpdate()}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        size="sm"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEditing(category.id, category.name)}
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(category.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default VehicleCategoryMaster;
