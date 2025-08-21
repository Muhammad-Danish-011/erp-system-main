"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";

export default function FreightChargeMaster() {
  const [vehicleType, setVehicleType] = useState("");
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [port, setPort] = useState("");
  const [freightCharge, setFreightCharge] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [charges, setCharges] = useState([
    { id: 1, type: "Cars", source: "Algeria", dest: "Oman", port: "Salalah", charge: 400, active: true },
    { id: 2, type: "Cars", source: "Japan", dest: "Tanzania", port: "Dar es Salaam", charge: 130, active: true },
    { id: 3, type: "Cars", source: "Japan", dest: "Zambia", port: "Durban", charge: 130, active: true },
  ]);

  const handleSave = () => {
    if (!vehicleType || !sourceCountry || !destinationCountry || !port || !freightCharge) return;
    setCharges([
      ...charges,
      {
        id: charges.length + 1,
        type: vehicleType,
        source: sourceCountry,
        dest: destinationCountry,
        port,
        charge: Number(freightCharge),
        active: isActive,
      },
    ]);
    
    setVehicleType("");
    setSourceCountry("");
    setDestinationCountry("");
    setPort("");
    setFreightCharge("");
    setIsActive(true);
  };

  return (

   <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Freight Charges</h1>
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Save
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        <button
          onClick={() => {
            setVehicleType("");
            setSourceCountry("");
            setDestinationCountry("");
            setPort("");
            setFreightCharge("");
            setIsActive(true);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium">Vehicle Type:</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">Please Select an Option</option>
            <option value="Cars">Cars</option>
            <option value="Trucks">Trucks</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Source Country:</label>
          <select value={sourceCountry} onChange={(e) => setSourceCountry(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">Please Select an Option</option>
            <option value="Algeria">Algeria</option>
            <option value="Japan">Japan</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Destination Country:</label>
          <select value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">Please Select an Option</option>
            <option value="Oman">Oman</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Zambia">Zambia</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Port:</label>
          <input value={port} onChange={(e) => setPort(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter port name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Freight Charge:</label>
          <input type="number" value={freightCharge} onChange={(e) => setFreightCharge(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 w-full" 
            placeholder="Enter freight charge"
          />
        </div>

        <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-1 sm:mt-5">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Is Active
        </div>
      </div>

      {/* USD/JPY note */}
      <div className="text-red-500 text-sm mb-2">1 USD = ¥147</div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">


         <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle Type</TableHead>
          <TableHead>Source Country</TableHead>
          <TableHead>Destination Country</TableHead>
          <TableHead>Port Name</TableHead>
          <TableHead>Charges</TableHead>
          <TableHead className="text-center">Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {charges.map((row) => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.source}</TableCell>
            <TableCell>{row.dest}</TableCell>
            <TableCell>{row.port}</TableCell>
            <TableCell>{row.charge}</TableCell>
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
