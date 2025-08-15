
"use client";

import React, { useState } from "react";
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

function optionsMaster() {
  const [vehicleType, setVehicleType] = useState("Cars");
  const [carMake, setCarMake] = useState("Toyota");
  const [modelName, setModelName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editModelName, setEditModelName] = useState("");
  const [carOptionsKey, setCarOptionsKey] = useState<string>("");

  const [options, setOptions] = useState([
    { id: 1, name: "Navigation System", active: true },
    { id: 2, name: "Spare Tyre", active: true },
    { id: 3, name: "Sun Roof", active: true },
    { id: 4, name: "Centralized Door Locks", active: true },
    { id: 5, name: "Front Camera", active: true },
    { id: 6, name: "Side Camera", active: true },
    { id: 7, name: "Back Camera", active: true },
    { id: 8, name: "Leather Seats", active: true },
    { id: 9, name: "HID", active: true },
    { id: 10, name: "Alloy Wheels", active: true },
    { id: 11, name: "Power Steering", active: true },
    { id: 12, name: "Air Bags", active: true },
    { id: 13, name: "Power Windows", active: true },
    { id: 14, name: "Keyless Entry", active: true },
    { id: 15, name: "Fog Lights", active: true },
    { id: 16, name: "Cruise Control", active: true },
    { id: 17, name: "Turbo", active: true },
  ]);

  const carMakes = ["Toyota", "Honda", "Nissan", "Mitsubishi", "Suzuki"];
  const vehicleTypes = ["Cars", "Trucks", "SUVs", "Vans", "Buses"];

  const handleSave = () => {
    if (modelName.trim()) {
      const newId =
        options.length > 0 ? Math.max(...options.map((m) => m.id)) + 1 : 1;
      setOptions([
        ...options,
        { id: newId, name: modelName, active: isActive },
      ]);
      setModelName("");
    }
  };

  const handleUpdate = () => {
    if (editingId !== null && editModelName.trim()) {
      setOptions(
        options.map((model) =>
          model.id === editingId ? { ...model, name: editModelName } : model
        )
      );
      setEditingId(null);
      setEditModelName("");
    }
  };

  // const handleDelete = (id: number) => {
  //   setOptions(options.filter((model) => model.id !== id));
  // };

  const handleDelete = () => {
    alert("Selected items deleted successfully!");
  };

  const handleClear = () => {
    setModelName("");
    setIsActive(true);
    setEditingId(null);
    setEditModelName("");
  };

  const startEditing = (id: number, name: string) => {
    setEditingId(id);
    setEditModelName(name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditModelName("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Additional Options Master</h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save
        </Button>
        <Button
          onClick={handleUpdate}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={editingId === null}
        >
          Update
        </Button>

        <Button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
        <Button
          onClick={handleClear}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Clear
        </Button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-white">
            Car option:
          </label>
          <Input
            value={carOptionsKey}
            onChange={(e) => setCarOptionsKey(e.target.value)}
            placeholder="car options"
          />
        </div>

        <div className="flex items-center gap-2 bg-white px-2 py-2 rounded h-min self-end">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={() => setIsActive(!isActive)}
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium text-gray-900"
          >
            Is Active
          </label>
        </div>

      </div>

      {/* Table */}
      <div className="border border-gray-600 rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-800 text-white">
            <TableRow>
              <TableHead className="w-24">OptionId</TableHead>
              <TableHead>Option Name</TableHead>
              <TableHead className="w-24">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((model) => (
              <TableRow key={model.id} className="bg-white hover:bg-gray-100">
                <TableCell>{model.id}</TableCell>
                <TableCell>
                  {editingId === model.id ? (
                    <Input
                      value={editModelName}
                      onChange={(e) => setEditModelName(e.target.value)}
                      className="w-full bg-gray-800 text-white border-gray-600"
                    />
                  ) : (
                    model.name
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={model.active}
                    onCheckedChange={() => {
                      setOptions(
                        options.map((m) =>
                          m.id === model.id ? { ...m, active: !m.active } : m
                        )
                      );
                    }}
                  />
                </TableCell>
                {/* <TableCell className="flex gap-2">
                  {editingId === model.id ? (
                    <>
                      <Button
                        onClick={() => handleUpdate()}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save
                      </Button>
                      <Button onClick={cancelEditing} size="sm" variant="outline">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEditing(model.id, model.name)}
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(model.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default optionsMaster;
