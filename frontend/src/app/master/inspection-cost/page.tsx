"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function InspectionCostMapping() {
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [groupBy, setGroupBy] = useState("");
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const [inspectionCostData, setInspectionCostData] = useState([
    { source: "Japan", destination: "Bahamas", cost: 250, active: true, hotLocations: ["Location 1", "Location 2"] },
    { source: "Japan", destination: "Guyana", cost: 250, active: true, hotLocations: [] },
    { source: "Japan", destination: "Jamaica", cost: 250, active: true, hotLocations: ["Location 3"] },
    { source: "Japan", destination: "Kenya", cost: 250, active: true, hotLocations: [] },
    { source: "Japan", destination: "Tanzania", cost: 250, active: true, hotLocations: ["Location 4", "Location 5"] },
    { source: "Japan", destination: "Uganda", cost: 250, active: true, hotLocations: [] },
    { source: "Japan", destination: "Zambia", cost: 400, active: true, hotLocations: ["Location 6"] },
    { source: "Japan", destination: "Zimbabwe", cost: 250, active: true, hotLocations: [] },
    { source: "Thailand", destination: "Guyana", cost: 400, active: true, hotLocations: [] },
    { source: "Thailand", destination: "Jamaica", cost: 400, active: true, hotLocations: ["Location 7"] },
    { source: "Thailand", destination: "Kenya", cost: 400, active: true, hotLocations: [] },
    { source: "United Arab Emirates", destination: "Guyana", cost: 400, active: true, hotLocations: ["Location 8"] },
    { source: "United Arab Emirates", destination: "Jamaica", cost: 400, active: true, hotLocations: [] },
    { source: "United Arab Emirates", destination: "Kenya", cost: 350, active: true, hotLocations: [] },
    { source: "United Arab Emirates", destination: "Tanzania", cost: 350, active: true, hotLocations: ["Location 9"] },
    { source: "United Arab Emirates", destination: "Uganda", cost: 350, active: true, hotLocations: [] },
    { source: "United Arab Emirates", destination: "Zambia", cost: 400, active: true, hotLocations: ["Location 10"] }
  ]);

  const handleSave = () => {
    alert('Changes saved successfully!');
  };

  const handleUpdate = () => {
    alert('Data updated successfully!');
  };

  const handleDelete = () => {
    alert('Selected items deleted successfully!');
  };

  const handleClear = () => {
    setSourceCountry("");
    setDestinationCountry("");
    setIsActive(true);
    setGroupBy("");
    setSearchSource("");
    setSearchDestination("");
  };

  const handleAddHotLocation = (source: string, destination: string) => {
    if (newLocation.trim()) {
      setInspectionCostData(data => data.map(item => 
        item.source === source && item.destination === destination
          ? { ...item, hotLocations: [...item.hotLocations, newLocation] }
          : item
      ));
      setNewLocation("");
      setEditingLocation(null);
    }
  };

  const uniqueSourceCountries = [...new Set(inspectionCostData.map(item => item.source))];
  const uniqueDestinationCountries = [...new Set(inspectionCostData.map(item => item.destination))];

  const filteredData = inspectionCostData
    .filter(item =>
      (sourceCountry === "" || item.source === sourceCountry) &&
      (destinationCountry === "" || item.destination === destinationCountry) &&
      (isActive === null || item.active === isActive) &&
      item.source.toLowerCase().includes(searchSource.toLowerCase()) &&
      item.destination.toLowerCase().includes(searchDestination.toLowerCase())
    );

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Inspection Cost Mapping</h1>

      <div className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">Save</Button>
        <Button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white">Update</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
        <Button onClick={handleClear} className="bg-gray-500 hover:bg-gray-600 text-white">Clear</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Source Country</label>
          <select 
            value={sourceCountry} 
            onChange={(e) => setSourceCountry(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All Countries</option>
            {uniqueSourceCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Destination Country</label>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All Countries</option>
            {uniqueDestinationCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium ">Search Source</h3>
          <Input
            placeholder="Search source..."
            value={searchSource}
            onChange={(e) => setSearchSource(e.target.value)}
            className='w-full'
          />
        </div>

        <div>
          <h3 className="text-sm font-medium">Search Destination</h3>
          <Input
            placeholder="Search destination..."
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            className='w-full'
          />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <Checkbox
          checked={isActive}
          onCheckedChange={() => setIsActive(!isActive)}
          className="mr-2"
        />
        <span>Active Only</span>
      </div>

      <Table className="w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="">
            <TableHead className="py-3 px-4 text-left  border-b">Source Country</TableHead>
            <TableHead className="py-3 px-4 text-left  border-b">Destination Country</TableHead>
            <TableHead className="py-3 px-4 text-left  border-b">Inspection Cost</TableHead>
            <TableHead className="py-3 px-4 text-left  border-b">Active</TableHead>
            <TableHead className="py-3 px-4 text-left  border-b">Hot Locations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow 
              key={index}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
            >
              <TableCell className="py-2 px-4 border-b border-gray-200">{item.source}</TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200">{item.destination}</TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200">{item.cost}</TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200">
                <Checkbox 
                  checked={item.active}
                  onCheckedChange={() => {
                    setInspectionCostData(data => data.map(d => 
                      d.source === item.source && d.destination === item.destination 
                        ? {...d, active: !d.active}
                        : d
                    ))
                  }}
                />
              </TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200">
                {/* <div className="flex items-center justify-between flex-wrap gap-1"> */}
                <div className="flex items-center justify-between gap-1">
                  <span className='hot_location_custom_overflow' >{item.hotLocations.join(", ") || "—"}</span>
                  {editingLocation === `${item.source}-${item.destination}` ? (
                    <div className="flex gap-1">
                      <Input
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Add new hot location"
                        className="w-48"
                      />
                      <Button
                        onClick={() => handleAddHotLocation(item.source, item.destination)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={() => setEditingLocation(null)}
                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setEditingLocation(`${item.source}-${item.destination}` as any)}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
                    >
                      +
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InspectionCostMapping;
