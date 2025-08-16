"use client";
import React, { useState } from 'react';
import CarListingForm from "../../../components/Transaction/AddCarListing/car-listing-form" 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TruckListingForm from '@/components/Transaction/AddCarListing/truck-listing-form';
import HeavyMachineryListingForm from '@/components/Transaction/AddCarListing/heavy-machinery-form';



function addCarListingPage() {
 const [vehicleType, setVehicleType] = useState("1");
     const vehicleTypes = [
    { id: 1, name: "Cars" },
    { id: 2, name: "Trucks" },
    { id: 3, name: "Heavy Machinery" },
  ];

  const [listingTitle, setListingTitle] = useState("");
  
  const [selectedType, setSelectedType] = useState("");
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
   alert('Selected items deleted successfully!');
  };

  console.log(vehicleType,"vehicleType")
  return (
    <>
        <div className="space-y-6">

 <h1 className="text-3xl font-bold text-center mb-8 text-white">Add Car Listing</h1>

   <div className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">Save</Button>
        <Button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white">Update</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
        <Button onClick={handleClear} className="bg-gray-500 hover:bg-gray-600 text-white">Clear</Button>
      </div>

       <div className=''>
          <label className="block text-sm font-medium mb-1 text-white ">Vehicle Type:</label>
           <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-[15%] bg-gray-800 text-white border-gray-600 rounded-md p-2"
        >
          {/* <option value="">Not Selected</option> */}
          {vehicleTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        </div>

 {vehicleType === "1" && <CarListingForm />}
        {vehicleType === "2" && <TruckListingForm />}
        {vehicleType === "3" && <HeavyMachineryListingForm />}                   
       

      {/* <CarListingForm/> */}

        </div>

    </>
 
  )
}

export default addCarListingPage