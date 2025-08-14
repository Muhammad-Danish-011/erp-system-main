"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function App() {
  const [searchHot, setSearchHot] = useState("");
  const [countries, setCountries] = useState([
    { name: 'Afghanistan', inventory: false, hot: false },
    { name: 'Albania', inventory: false, hot: false },
    { name: 'Algeria', inventory: false, hot: false },
    { name: 'Andorra', inventory: false, hot: false },
    { name: 'Angola', inventory: false, hot: false },
    { name: 'Antigua & Barbuda', inventory: false, hot: false },
    { name: 'Argentina', inventory: false, hot: false },
    { name: 'Armenia', inventory: false, hot: false },
    { name: 'Aruba', inventory: false, hot: false },
    { name: 'Australia', inventory: false, hot: false },
    { name: 'Austria', inventory: false, hot: false },
    { name: 'Azerbaijan', inventory: false, hot: false },
    { name: 'Bahamas', inventory: false, hot: false },
    { name: 'Bahrain', inventory: false, hot: false },
    { name: 'Bangladesh', inventory: false, hot: false },
    { name: 'Barbados', inventory: false, hot: false },
    { name: 'Belarus', inventory: false, hot: false },
    { name: 'Belgium', inventory: false, hot: false },
    { name: 'Belize', inventory: false, hot: false }
  ]);

  const [inventoryLocations, setInventoryLocations] = useState([
    { country: 'China', hotLocations: [] },
    { country: 'Germany', hotLocations: ['Bahamas'] },
    { country: 'Japan', hotLocations: ['Botswana'] },
    { country: 'Singapore', hotLocations: ['British Virgin Islands'] },
    { country: 'South Korea', hotLocations: ['Burundi'] },
    { country: 'Thailand', hotLocations: ['Cayman Island'] },
    { country: 'United Arab Emirates', hotLocations: ['Chile'] },
    { country: 'United Kingdom', hotLocations: ['Cyprus'] },
    { country: 'United States', hotLocations: ['Democratic Republic of Congo'] },
    { country: 'France', hotLocations: ['French Guiana'] },
    { country: 'Ghana', hotLocations: ['Ghana'] },
    { country: 'Guyana', hotLocations: ['Guinea'] },
    { country: 'Jamaica', hotLocations: ['Jamaica'] },
    { country: 'Kenya', hotLocations: ['Kenya'] },
    { country: 'Malawi', hotLocations: ['Malawi'] },
    { country: 'Mauritius', hotLocations: ['Mozambique'] },
    { country: 'Pakistan', hotLocations: ['Pakistan'] },
    { country: 'Paraguay', hotLocations: ['Paraguay'] },
    { country: 'Rwanda', hotLocations: ['Rwanda'] }
  ]);

  const [searchCountry, setSearchCountry] = useState('');
  const [searchInventory, setSearchInventory] = useState('');
  const [editingHotLocation, setEditingHotLocation] = useState(null);
  const [newHotLocation, setNewHotLocation] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const filteredInventoryLocations = inventoryLocations.filter(location =>
    location.country.toLowerCase().includes(searchInventory.toLowerCase())
  );

  const handleInventoryChange = (countryName: string) => {

    setCountries(countries.map(country =>
      country.name === countryName
        ? { ...country, inventory: !country.inventory }
        : country
    ));
  };

  const handleHotChange = (countryName: string) => {
    setCountries(countries.map(country =>
      country.name === countryName
        ? { ...country, hot: !country.hot }
        : country
    ));
  };

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
    setCountries(countries.map(country => ({
      ...country,
      inventory: false,
      hot: false
    })));
    alert('Selections cleared!');
  };

  const handleAddHotLocation = (country: string) => {
    if (newHotLocation.trim()) {
      const updatedLocations = inventoryLocations.map(location =>
        location.country === country
          ? { ...location, hotLocations: [...location.hotLocations, newHotLocation] }
          : location
      );
      setInventoryLocations(updatedLocations);
      setNewHotLocation('');
      setEditingHotLocation(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Inventory / Hot Location Mapper</h1>

      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">Save</Button>
        <Button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white">Update</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
        <Button onClick={handleClear} className="bg-gray-500 hover:bg-gray-600 text-white">Clear</Button>
      </div>
      {/* Country Table */}
      <div className="flex gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <h2 className="text-2xl font-semibold mb-4">Set Inventory and Hot Location for Countries</h2>
          <Input
            placeholder="Search countries..."
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            className="mb-4 w-64"
          />
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-300">
                <TableHead className="border-r border-gray-300 px-2">Country Name</TableHead>
                <TableHead className="text-center border-r border-gray-300 px-2">Inventory</TableHead>
                <TableHead className="text-center px-2">Hot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((country) => (
                <TableRow key={country.name} className="border-b border-gray-300">
                  <TableCell className="border-r border-gray-300 px-2">{country.name}</TableCell>
                  <TableCell className="text-center border-r border-gray-300 px-2">
                    <Checkbox
                      checked={country.inventory}
                      onCheckedChange={() => handleInventoryChange(country.name)}
                    />
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <Checkbox
                      checked={country.hot}
                      onCheckedChange={() => handleHotChange(country.name)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Inventory Locations Table */}
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <h2 className="text-2xl font-semibold mb-4">Inventory Locations</h2>
          <Input
            placeholder="Search country..."
            value={searchInventory}
            onChange={(e) => setSearchInventory(e.target.value)}
            className="mb-4 w-64"
          />
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-300">
                <TableHead className="px-2">Country Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventoryLocations.map((location) => (
                <TableRow key={location.country} className="border-b border-gray-300">
                  <TableCell className="px-2">{location.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Hot Locations Table */}
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <h2 className="text-2xl font-semibold mb-4">Hot Locations</h2>
          <Input
            placeholder="Search hot location..."
            value={searchHot}
            onChange={(e) => setSearchHot(e.target.value)}
            className="mb-4 w-64"
          />
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-300">
                <TableHead className="border-r border-gray-300 px-2">Country Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventoryLocations.map((location) => (
                <TableRow key={location.country} className="border-b border-gray-300">
                  <TableCell className="px-2">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span>{location.hotLocations.join(", ") || "—"}</span>
                      {editingHotLocation === location.country ? (
                        <div className="flex gap-1">
                          <Input
                            value={newHotLocation}
                            onChange={(e) => setNewHotLocation(e.target.value)}
                            placeholder="Add new hot location"
                            className="w-48"
                          />
                          <Button
                            onClick={() => handleAddHotLocation(location.country)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Add
                          </Button>
                          <Button
                            onClick={() => setEditingHotLocation(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setEditingHotLocation(location.country as unknown as null)}
                          className="bg-green-500 hover:bg-green-600 text-white"
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

      </div>
    </div>
  );
}
export default App;
