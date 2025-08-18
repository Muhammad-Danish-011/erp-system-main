"use client";

import { useState } from "react";
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

interface CarBrand {
  id: number;
  brandName: string;
  slug: string;
  active: boolean;
}

export default function CarBrandPage() {
  const [vehicleType, setVehicleType] = useState("Cars");
  const [makeName, setMakeName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);

  const [brands, setBrands] = useState<CarBrand[]>([
    { id: 1, brandName: "Toyota", slug: "toyota", active: true },
    { id: 2, brandName: "Nissan", slug: "nissan", active: true },
    { id: 3, brandName: "Honda", slug: "honda", active: true },
    { id: 4, brandName: "Mitsubishi", slug: "mitsubishi", active: true },
    { id: 5, brandName: "Subaru", slug: "subaru", active: true },
  ]);

  const filteredBrands = brands.filter((b) =>
    b.brandName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!makeName) return;

    if (selectedBrand) {
      setBrands(
        brands.map((brand) =>
          brand.id === selectedBrand.id
            ? {
                ...brand,
                brandName: makeName,
                slug: makeName.toLowerCase(),
                active: isActive,
              }
            : brand
        )
      );
    } else {
      setBrands([
        ...brands,
        {
          id: brands.length + 1,
          brandName: makeName,
          slug: makeName.toLowerCase(),
          active: isActive,
        },
      ]);
    }
    handleClear();
  };

  const handleUpdate = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setMakeName(brand.brandName);
    setIsActive(brand.active);
  };

  const handleDelete = (id: number) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  const handleClear = () => {
    setMakeName("");
    setIsActive(true);
    setSelectedBrand(null);
  };

  const toggleBrandActive = (id: number, checked: boolean) => {
    setBrands(
      brands.map((brand) =>
        brand.id === id ? { ...brand, active: checked } : brand
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
          {selectedBrand ? "Update" : "Save"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => selectedBrand && handleDelete(selectedBrand.id)}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
        <Button variant="outline" onClick={handleClear} className="border-gray-300 hover:bg-gray-100 text-gray-700">
          Clear
        </Button>
      </div>

      {/* Form */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Select Option</label>
          <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-56 border border-gray-300 rounded-md p-2"
          >
            <option value="">Not Selected</option>
            <option value="Cars">Cars</option>
            <option value="Trucks">Trucks</option>
            <option value="HeavyMachinery">HeavyMachinery</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Make Name</label>
          <Input
            value={makeName}
            onChange={(e) => setMakeName(e.target.value)}
            placeholder="Enter make name"
            className="w-56"
          />
        </div>

        <div className="flex items-center gap-2 mt-6">
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
        <Input
          placeholder="Enter text to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-64"
        />
<div className="overflow-x-auto">



        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Brand Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.brandName}</TableCell>
                <TableCell>{brand.slug}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={brand.active}
                    onCheckedChange={(checked) =>
                      toggleBrandActive(brand.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleUpdate(brand)}
                  >
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
