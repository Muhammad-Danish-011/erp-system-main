"use client";
import { useState } from "react";
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

export default function CountryPortMapping() {
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [mappings, setMappings] = useState([
    { id: 1, country: "Tanzania", port: "Dar es Salaam", active: true },
    { id: 2, country: "Uganda", port: "Dar es Salaam", active: true },
    { id: 3, country: "Oman", port: "Salalah", active: true },
  ]);

  const handleSave = () => {
    if (!country || !port) return;
    setMappings([
      ...mappings,
      { id: mappings.length + 1, country, port, active: isActive },
    ]);
    setCountry("");
    setPort("");
    setIsActive(true);
  };

  return (
 <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Port Country Mapping</h1>
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
        <button
          onClick={() => {
            setCountry("");
            setPort("");
            setIsActive(true);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4  py-4 rounded-lg">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Select Country :</label>
          <select
            // value={sourceCountry}
            // onChange={(e) => setSourceCountry(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Please Select an Option</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Uganda">Uganda</option>
            <option value="Oman">Oman</option>
            <option value="Iran">Iran</option>
            {/* {uniqueSourceCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))} */}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Select Port :</label>
          <select
            // value={destinationCountry}
            // onChange={(e) => setDestinationCountry(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Please Select an Option</option>
            <option value="Dar es Salaam">Dar es Salaam</option>
            <option value="Salalah">Salalah</option>
            <option value="Jebel Ali">Jebel Ali</option>
            {/* {uniqueDestinationCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))} */}
          </select>
        </div>

        <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-1 sm:mt-5">
          <Checkbox
            checked={isActive}
            onCheckedChange={() => setIsActive(!isActive)}
            className="mr-2"
          />
          <span>Active Only</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Port</TableHead>
              <TableHead className="text-center">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappings.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.port}</TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={row.active} disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
 </>
  );
}
