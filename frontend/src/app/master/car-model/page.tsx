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
import Loading from "@/components/ui/Loading";

function ModelsMaster() {
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState("Cars");
  const [carMake, setCarMake] = useState("Toyota");
  const [modelName, setModelName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editModelName, setEditModelName] = useState("");

  const [models, setModels] = useState([
    { id: 1, name: "Allion", active: true },
    { id: 2, name: "Camry", active: true },
    { id: 3, name: "Coaster", active: true },
    { id: 4, name: "Corolla", active: true },
    { id: 5, name: "ESTIMA", active: true },
    { id: 6, name: "Fortuner", active: true },
    { id: 7, name: "Harrier", active: true },
    { id: 8, name: "Hiace Van", active: true },
    { id: 9, name: "Hilux", active: true },
    { id: 10, name: "Hilux Double Cab", active: true },
    { id: 11, name: "Ist", active: true },
    { id: 12, name: "Kluger", active: true },
    { id: 13, name: "Mark X", active: true },
    { id: 14, name: "Probox", active: true },
  ]);

  const carMakes = ["Toyota", "Honda", "Nissan", "Mitsubishi", "Suzuki"];
  const vehicleTypes = ["Cars", "Trucks", "SUVs", "Vans", "Buses"];

  const handleSave = () => {
    if (modelName.trim()) {
      const newId =
        models.length > 0 ? Math.max(...models.map((m) => m.id)) + 1 : 1;
      setModels([...models, { id: newId, name: modelName, active: isActive }]);
      setModelName("");
    }
  };

  const handleUpdate = () => {
    if (editingId !== null && editModelName.trim()) {
      setModels(
        models.map((model) =>
          model.id === editingId ? { ...model, name: editModelName } : model
        )
      );
      setEditingId(null);
      setEditModelName("");
    }
  };

  const handleDelete = (id: number) => {
    setModels(models.filter((model) => model.id !== id));
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Models Master</h1>

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
          onClick={handleClear}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Clear
        </Button>
      </div>

      {/* Input Fields */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-4 xl:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Vehicle Type:
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-600 rounded-md p-2"
          >
            <option value="">Not Selected</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Select Car Make:
          </label>
          <select
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-600 rounded-md p-2"
          >
            <option value="">Not Selected</option>
            {carMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Model Name:
          </label>
          <div className="flex gap-2">
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
            />
          </div>
        </div>

         <div className="flex items-center gap-2 p-2 rounded mt-6 bg-[#1f2937] border border-gray-600 ">
              <Checkbox
                id="isActive"
                checked={isActive}
                onCheckedChange={() => setIsActive(!isActive)}
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-white"
              >
                Is Active
              </label>
            </div>
      </div>

      {/* Table */}
      <div className="border border-gray-600 rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-24">ModelId</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead className="w-24">Active</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id} className="bg-white ">
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
                      setModels(
                        models.map((m) =>
                          m.id === model.id ? { ...m, active: !m.active } : m
                        )
                      );
                    }}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  {editingId === model.id ? (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ModelsMaster;
