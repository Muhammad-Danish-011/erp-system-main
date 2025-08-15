"use client";
import React, { useState } from "react";

interface AddCustomerModalProps {
  onSubmit: (data: any) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    email1: "",
    email2: "",
    email3: "",
    address: "",
    country: "",
    port: "",
    phone1: "0",
    phone2: "0",
    phone3: "0",
    assignedToAgent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData({
      companyName: "",
      title: "Mr.",
      firstName: "",
      lastName: "",
      email1: "",
      email2: "",
      email3: "",
      address: "",
      country: "",
      port: "",
      phone1: "0",
      phone2: "0",
      phone3: "0",
      assignedToAgent: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Company Name */}
      <div>
        <label className="block text-sm sm:text-base">Company Name :</label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>

      {/* Title, First Name, Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <label className="block text-sm sm:text-base">Title :</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border w-full px-2 py-1 text-sm sm:text-base"
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
          </select>
        </div>
        <div>
          <label className="block text-sm sm:text-base">First Name :</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border w-full px-2 py-1 text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base">Last Name :</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border w-full px-2 py-1 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Emails */}
      <div>
        <label className="block text-sm sm:text-base">Email :</label>
        <input
          type="email"
          name="email1"
          value={formData.email1}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>
      <div>
        <label className="block text-sm sm:text-base">Email 2 :</label>
        <input
          type="email"
          name="email2"
          value={formData.email2}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>
      <div>
        <label className="block text-sm sm:text-base">Email 3 :</label>
        <input
          type="email"
          name="email3"
          value={formData.email3}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm sm:text-base">Address :</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>

      {/* Country & Port */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm sm:text-base">Country :</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border w-full px-2 py-1 text-sm sm:text-base"
          >
            <option value="">Please Select an Option</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Zambia">Zambia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm sm:text-base">Port :</label>
          <select
            name="port"
            value={formData.port}
            onChange={handleChange}
            className="border w-full px-2 py-1 text-sm sm:text-base"
          >
            <option value="">Select Port</option>
          </select>
        </div>
      </div>

      {/* Phones */}
      <div>
        <label className="block text-sm sm:text-base">Phone :</label>
        <input
          name="phone1"
          value={formData.phone1}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>
      <div>
        <label className="block text-sm sm:text-base">Phone 2 :</label>
        <input
          name="phone2"
          value={formData.phone2}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>
      <div>
        <label className="block text-sm sm:text-base">Phone 3 :</label>
        <input
          name="phone3"
          value={formData.phone3}
          onChange={handleChange}
          className="border w-full px-2 py-1 text-sm sm:text-base"
        />
      </div>

      {/* Assigned to Agent */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="assignedToAgent"
          checked={formData.assignedToAgent}
          onChange={handleChange}
        />
        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm sm:text-base">
          Is Assigned to Agent
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded text-sm sm:text-base"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded text-sm sm:text-base"
        >
          Clear Fields
        </button>
      </div>
    </form>
  );
};

export default AddCustomerModal;
