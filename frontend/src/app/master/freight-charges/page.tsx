"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";
import { toast } from "@/components/ui/CustomToast";
import Loading from "@/components/ui/Loading";

export default function FreightChargeMaster() {
  const [charges, setCharges] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharges, setFilteredCharges] = useState<any[]>([]);

  // Form state
  const [id, setId] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState("");
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [port, setPort] = useState("");
  const [freightCharge, setFreightCharge] = useState("");
  const [isActive, setIsActive] = useState(true);


  const fetchCharges = async () => {
    try {
      setLoading(true);
      const res = await api.get("/FreightCharges");
      setCharges(res.data);
      setFilteredCharges(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch freight charges");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch countries
  const fetchCountries = async () => {
    try {
      const res = await api.get("/Country");
      setCountries(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch countries");
    }
  };

  // ✅ Fetch ports
  const fetchPorts = async () => {
    try {
      const res = await api.get("/Ports");
      setPorts(res.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to fetch ports");
    }
  };

  useEffect(() => {
    fetchCharges();
    fetchCountries();
    fetchPorts();
  }, []);

  // ✅ Filter/search functionality
  useEffect(() => {
    const filtered = charges.filter((charge) =>
      charge.vehicleType.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.sourceCountryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.destinationCountryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.portName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.freigthAmount.toString().includes(searchTerm)
    );
    setFilteredCharges(filtered);
  }, [searchTerm, charges]);

  // ✅ Create or Update
  const handleSave = async () => {
    if (!vehicleType || !sourceCountry || !destinationCountry || !port || !freightCharge) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const payload = {
        VehicleTypeID: vehicleType === "Cars" ? 1 : vehicleType === "Trucks" ? 2 : 3,
        SourceCountryName: sourceCountry,
        DestinationCountryName: destinationCountry,
        PortName: port, // ✅ backend expects PortName, not PortID
        FreigthAmount: Number(freightCharge),
        isActive,
      };

      if (id) {
        await api.patch(`/FreightCharges/${id}`, payload);
        toast.success("Freight charge updated");
      } else {
        await api.post("/FreightCharges", payload);
        toast.success("Freight charge created");
      }

      resetForm();
      fetchCharges();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data || "Operation failed");
    }
  };

  // ✅ Delete
  const handleDelete = async (chargeId: number) => {
    if (!confirm("Are you sure you want to delete this charge?")) return;
    try {
      await api.delete(`/FreightCharges/${chargeId}`);
      toast.success("Deleted successfully");
      fetchCharges();
    } catch (err: any) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ✅ Edit
  const handleEdit = (charge: any) => {
    setId(charge.id);
    setVehicleType(
      charge.vehicleType === "Cars"
        ? "Cars"
        : charge.vehicleType === "Trucks"
        ? "Trucks"
        : "Heavy"
    );
    setSourceCountry(charge.sourceCountryName);
    setDestinationCountry(charge.destinationCountryName);
    setPort(charge.portName);
    setFreightCharge(charge.freigthAmount);
    setIsActive(charge.isActive);
  };

  const resetForm = () => {
    setId(null);
    setVehicleType("");
    setSourceCountry("");
    setDestinationCountry("");
    setPort("");
    setFreightCharge("");
    setIsActive(true);
  };

  return (
    <>
        {loading ? (
              <Loading />  
          ) : (
            <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Freight Charges
      </h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {id ? "Update" : "Save"}
        </button>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
        {/* Search Box */}
        <div className="flex justify-center mb-4 w-full md:w-1/3 mx">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">Vehicle Type:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              <option value="Cars">Cars</option>
              <option value="Trucks">Trucks</option>
              <option value="Heavy">Heavy</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Source Country:</label>
            <select
              value={sourceCountry}
              onChange={(e) => setSourceCountry(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryName}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Destination Country:</label>
            <select
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryName}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Ports Dropdown */}
          <div>
            <label className="text-sm font-medium">Port:</label>
            <select
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              {ports.map((p) => (
                <option key={p.portId} value={p.portName}>
                  {p.portName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Freight Charge:</label>
            <input
              type="number"
              value={freightCharge}
              onChange={(e) => setFreightCharge(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter charge"
            />
          </div>

          <div className="bg-[#1f2937] text-white rounded flex items-center gap-2 p-2 mt-1 sm:mt-5">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Is Active
          </div>
        </div>

        {/* Table */}
<div className="overflow-x-auto border border-gray-300 rounded">
  <Table data={filteredCharges}>
    <TableHeader>
      <TableRow>
        <TableHead>Vehicle Type</TableHead>
        <TableHead>Source Country</TableHead>
        <TableHead>Destination Country</TableHead>
        <TableHead>Port Name</TableHead>
        <TableHead>Charges</TableHead>
        <TableHead className="text-center">Active</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={7} className="text-center">
            Loading...
          </TableCell>
        </TableRow>
      ) : (
        filteredCharges.map((row) => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell>{row.vehicleType}</TableCell>
            <TableCell>{row.sourceCountryName}</TableCell>
            <TableCell>{row.destinationCountryName}</TableCell>
            <TableCell>{row.portName}</TableCell>
            <TableCell>{row.freigthAmount}</TableCell>
            <TableCell className="text-center">
              <Checkbox checked={row.isActive} disabled />
            </TableCell>
            <TableCell className="text-center">
              <button
                onClick={() => handleEdit(row)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>
</div>
</>

)}

</>
  )}
