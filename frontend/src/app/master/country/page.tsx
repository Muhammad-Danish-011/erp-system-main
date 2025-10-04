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

interface Country {
  countryId: number;
  countryName: string;
  countryCode: string;
  slug: string;
  isActive: boolean;
}

export default function CountryMasterPage() {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all countries
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await api.get("/Country");
      setCountries(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch countries");
    } finally {
      setLoading(false);
    }
  };

  // Save or Update country
  const handleSave = async () => {
    if (!countryName || !countryCode ) {
      toast.error("All fields are required");
      return;
    }

    const payload = { countryName, countryCode, slug, isActive };

    try {
      if (selectedCountry) {
        await api.patch(`/Country/${selectedCountry.countryId}`, payload);
        toast.success("Country updated successfully");
      } else {
        await api.post("/Country", payload);
        toast.success("Country added successfully");
      }
      fetchCountries();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to save country");
    }
  };

  // Edit country
  const handleEdit = (country: Country) => {
    setSelectedCountry(country);
    setCountryName(country.countryName);
    setCountryCode(country.countryCode);
    setSlug(country.slug);
    setIsActive(country.isActive);
    toast.info("Edit mode enabled ✏️");
  };

  // Delete country
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Country/${id}`);
      toast.success("Country deleted successfully");
      fetchCountries();
      handleClear();
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to delete country");
    }
  };

  // Clear form
  const handleClear = () => {
    setCountryName("");
    setCountryCode("");
    setSlug("");
    setIsActive(true);
    setSelectedCountry(null);
    toast.info("Form cleared 🧹");
  };

  // Filter countries
  const filteredCountries = countries.filter((c) =>
    c.countryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Countries
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <Button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {selectedCountry ? "Update" : "Save"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => selectedCountry && handleDelete(selectedCountry.countryId)}
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
          <label className="text-sm font-medium">Country Name</label>
          <Input
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Enter country name"
            className="w-56"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Country Code</label>
          <Input
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Enter country code"
            className="w-56"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter slug"
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
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto">
          <Table data={filteredCountries}>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Country Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((c) => (
                <TableRow key={c.countryId}>
                  <TableCell>{c.countryId}</TableCell>
                  <TableCell>{c.countryName}</TableCell>
                  <TableCell>{c.countryCode}</TableCell>
                  <TableCell>{c.slug}</TableCell>
                  <TableCell>
                    <Checkbox checked={c.isActive} disabled />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => handleEdit(c)}>
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
