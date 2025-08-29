import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Upload } from "lucide-react"; // Icon library (lucide-react)

export default function CarListingForm() {
  const [isActive, setIsActive] = useState(true);

  const carOptions = [
    { id: "isActive", label: "Is Active" },
    { id: "isFeatured", label: "Featured" },
    { id: "hasWarranty", label: "Has Warranty" },
    { id: "isSold", label: "Sold" },
    { id: "isNew", label: "Brand New" },
    { id: "isUsed", label: "Used" },
    { id: "isElectric", label: "Electric" },
    { id: "isHybrid", label: "Hybrid" },
    { id: "hasServiceHistory", label: "Service History" },
    { id: "isAccidentFree", label: "Accident Free" },
    { id: "hasFinanceOption", label: "Finance Option" },
    { id: "isImported", label: "Imported" },
    { id: "hasSunroof", label: "Sunroof" },
    { id: "hasLeatherSeats", label: "Leather Seats" },
    { id: "hasNavigation", label: "Navigation" },
    { id: "hasBluetooth", label: "Bluetooth" },
    { id: "hasBackupCamera", label: "Backup Camera" },
{ id: "hasParkingSensors", label: "Parking Sensors" },
{ id: "hasHeatedSeats", label: "Heated Seats" },
{ id: "hasAlloyWheels", label: "Alloy Wheels" },
  ];

  const [options, setOptions] = useState<Record<string, boolean>>({
    isActive: false,
    isFeatured: false,
    hasWarranty: false,
    isSold: false,
  });

  const toggleOption = (id: string) => {
    setOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <form
      className="car-form"
      style={{ background: "#f4faff", padding: "20px" }}
    >
      {/* First Row */}
      <div className="row">
        <label className="block text-sm font-medium mb-1">Listing Title:</label>
        <input
          type="text"
          className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
          placeholder="Listing Title"
        />

        <label>
          <input type="checkbox" className="ml-4" /> Dealer Stock
        </label>
      </div>

      {/* second Row */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
  {/* Make Type */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Make:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Type 1</option>
      <option value="2">Type 2</option>
      <option value="3">Type 3</option>
    </select>
  </div>

  {/* Model */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Model:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Model 1</option>
      <option value="2">Model 2</option>
      <option value="3">Model 3</option>
    </select>
  </div>

  {/* Condition */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Condition:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">New</option>
      <option value="2">Used</option>
    </select>
  </div>

  {/* Inventory Location */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Inventory Location:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Location 1</option>
      <option value="2">Location 2</option>
    </select>
  </div>

  {/* Transmission */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Transmission:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Type 1</option>
      <option value="2">Type 2</option>
      <option value="3">Type 3</option>
    </select>
  </div>

  {/* Fuel Type */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Fuel Type:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Model 1</option>
      <option value="2">Model 2</option>
      <option value="3">Model 3</option>
    </select>
  </div>

  {/* Drive train */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Drivetrain:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">New</option>
      <option value="2">Used</option>
    </select>
  </div>

  {/* Hot Location */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Hot Location:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Location 1</option>
      <option value="2">Location 2</option>
    </select>
  </div>

  {/* Steering Type */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Steering Type:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Type 1</option>
      <option value="2">Type 2</option>
      <option value="3">Type 3</option>
    </select>
  </div>

  {/* Color */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Select Color:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">Model 1</option>
      <option value="2">Model 2</option>
      <option value="3">Model 3</option>
    </select>
  </div>

  {/* Body Type */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium mb-1">Body Type:</label>
    <select className="bg-gray-800 text-white border-gray-600 rounded-md p-2">
      <option value="">Not Selected</option>
      <option value="1">New</option>
      <option value="2">Used</option>
    </select>
  </div>
</div>


      {/* third Row */}

 <div className="flex flex-wrap gap-4 pt-2 border border-2 my-3 p-2">
  <div className="row">
    <label className="block text-sm font-medium mb-1">Engine size:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1">Year:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">Price:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">no of Doors:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">no of Seats:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">Mode Code:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">Auction Grade:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">Loading Capacity:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1 ">Mileage:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1">Engine Number:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1">Chasis Number:</label>
    <input
      type="text"
      className="bg-gray-800 text-white border-gray-600 rounded-md p-2 placeholder-white"
      placeholder=""
    />
  </div>

  <div className="row">
    <label className="block text-sm font-medium mb-1">Dimension:</label>
    <div className="flex gap-2">
      <input
        type="text"
        className="w-20 bg-gray-800 text-white border-gray-600 rounded-md p-2 text-sm placeholder-white"
        placeholder="L"
      />
      <input
        type="text"
        className="w-20 bg-gray-800 text-white border-gray-600 rounded-md p-2 text-sm placeholder-white"
        placeholder="W"
      />
      <input
        type="text"
        className="w-20 bg-gray-800 text-white border-gray-600 rounded-md p-2 text-sm placeholder-white"
        placeholder="H"
      />
    </div>
  </div>
</div>

      {/* fourth Row */}

      <div className="flex gap-2">
        <div className="w-[50vw] py-5">
          <label className="block text-sm font-medium mb-1">Car Options:</label>

          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-40 ">
            {carOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 bg-gray-800 px-2 py-2 rounded h-50 w-fit "
              >
                <Checkbox
                  id={option.id}
                  checked={options[option.id]}
                  onCheckedChange={() => toggleOption(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium text-white"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          {/* Admin Note */}
          <div className="flex gap-2 py-5 flex-col md:flex-row">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Admin Note:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Enter admin note here..."
              ></textarea>
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Description:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Enter description here..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="w-[30vw]">
          <div className=" mt-6 flex gap-4">
            {/* Feature Image */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Featured Image:
              </label>
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                <Upload className="w-8 h-4 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Click or drag to upload</p>
                <input type="file" className="hidden" />
              </div>
            </div>
          </div>

          <div className=" mt-6 flex gap-4">
            {/* Feature Image */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Additional Image:
              </label>
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                <Upload className="w-8 h-4 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Click or drag to upload</p>
                <input type="file" className="hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
