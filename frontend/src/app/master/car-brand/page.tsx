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

interface CarBrand {
  makeId: number;
  makeName: string;
  slug: string;
  isActive: boolean;
  vehicleTypeID: number;
  imageUrl?: string;
}

export default function CarBrandPage() {
  const [vehicleType, setVehicleType] = useState("Not Selected");
  const [makeName, setMakeName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands whenever vehicle type changes
  useEffect(() => {
    fetchBrands(vehicleType);
  }, [vehicleType]);

  const fetchBrands = async (type?: string) => {
    try {
      setLoading(true);
      const vehicleTypeID =
        type === "Cars" ? 1 : type === "Trucks" ? 2 : type === "HeavyMachinery" ? 3 : 0;
      const url = vehicleTypeID > 0 ? `/Makes?vehicleTypeID=${vehicleTypeID}` : "/Makes";
      const res = await api.get(url);
      setBrands(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  // Save or update
  const handleSave = async () => {
    if (!makeName) {
      toast.error("Make name is required");
      return;
    }

    const payload = {
      makeName,
      slug: makeName.toLowerCase(),
      isActive,
      vehicleTypeID:
        vehicleType === "Cars" ? 1 : vehicleType === "Trucks" ? 2 : 3,
      imageUrl: imageUrl || "", // ensure empty string instead of null
    };

    try {
      if (selectedBrand) {
        // Update
        const updatePayload = { ...payload, makeId: selectedBrand.makeId };
        await api.patch(`/Makes/${selectedBrand.makeId}`, updatePayload);
        toast.success("Brand updated successfully");
      } else {
        // Add new
        await api.post("/Makes", payload);
        toast.success("Brand added successfully");
      }
      fetchBrands();
      handleClear();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to save brand");
    }
  };

  // Edit
  const handleUpdate = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setMakeName(brand.makeName);
    setIsActive(brand.isActive);
    setImageUrl(brand.imageUrl || "");
    setVehicleType(
      brand.vehicleTypeID === 1
        ? "Cars"
        : brand.vehicleTypeID === 2
        ? "Trucks"
        : "HeavyMachinery"
    );
        toast.info("Edit mode enabled ✏️");
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Makes/${id}`);
      toast.success("Brand deleted successfully");
      fetchBrands();
      handleClear();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to delete brand");
    }
  };

  // Clear form
  const handleClear = () => {
    setMakeName("");
    setIsActive(true);
    setImageUrl("");
    setSelectedBrand(null);
     toast.info("Form cleared 🧹");
  };

  // Filter brands
  const filteredBrands = brands.filter((b) =>
    b.makeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Car Brands
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <Button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {selectedBrand ? "Update" : "Save"}
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            selectedBrand && handleDelete(selectedBrand.makeId)
          }
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

        <div className="flex flex-col">
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL (optional)"
            className="w-56"
          />
        </div>

        <div className="flex items-center gap-2 mt-6 bg-[#1f2937] text-white w-[250px] p-2 rounded border border-gray-600">
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
            placeholder="Enter text to search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto">
          <Table data={filteredBrands}>
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
                <TableRow key={brand.makeId}>
                  <TableCell>{brand.makeId}</TableCell>
                  <TableCell>{brand.makeName}</TableCell>
                  <TableCell>{brand.slug}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={brand.isActive}
                      disabled={true}
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
