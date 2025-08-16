"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VehicleCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  vehicleName: string;
}

export default function VehicleCostModal({
  isOpen,
  onClose,
  vehicleId,
  vehicleName,
}: VehicleCostModalProps) {
  if (!isOpen) return null;

  const [fxRate, setFxRate] = useState<number>(150);

  // Cost fields
  const [costs, setCosts] = useState({
    buying: 466000,
    domestic: 65000,
    extraTransport: 38000,
    inspection: 0,
    repairs: 0,
    insurance: 0,
    portStorage: 0,
    photo: 0,
    extraJob: 23000,
    vanning: 0,
    freight: 266425,
    courier: 0,
  });

  // Handle input change
  const handleChange = (field: keyof typeof costs, value: string) => {
    setCosts({ ...costs, [field]: Number(value) || 0 });
  };

  // Calculate totals
  const totalJPY = Object.values(costs).reduce((a, b) => a + b, 0);
  const totalUSD = totalJPY / fxRate;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">
            {vehicleId} - {vehicleName}
          </h2>
          <div className="space-x-2">
            <Button className="bg-green-600 text-white">Save</Button>
            <Button className="bg-yellow-500 text-white">Update</Button>
            <Button className="bg-red-600 text-white">Delete</Button>
            <Button className="bg-gray-400 text-white">Clear</Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - JPY */}
          <div className="col-span-5">
            <h3 className="font-semibold mb-2">( ¥ )</h3>
            <div className="space-y-2">
              {Object.entries(costs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <label className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(key as keyof typeof costs, e.target.value)}
                    className="border px-2 py-1 text-sm w-28 text-right rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - USD */}
          <div className="col-span-3">
            <h3 className="font-semibold mb-2">($)</h3>
            <div className="space-y-2">
              {Object.entries(costs).map(([key, value]) => (
                <div key={key} className="text-right">
                  <input
                    type="text"
                    disabled
                    value={(value / fxRate).toFixed(2)}
                    className="border px-2 py-1 text-sm w-28 text-right rounded bg-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="col-span-4">
            <h3 className="font-semibold mb-3">
              Fx Rate:{" "}
              <input
                type="number"
                value={fxRate}
                onChange={(e) => setFxRate(Number(e.target.value) || 1)}
                className="border px-2 py-1 w-24 text-right rounded"
              />
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total CNF (¥):</span>
                <span className="font-semibold">{totalJPY.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total CNF ($):</span>
                <span className="font-semibold">${totalUSD.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Total Charges (¥):</span>
                <span>{(totalJPY + 10000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Total Charges ($):</span>
                <span>${(totalUSD + 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Profit (¥):</span>
                <span>{(500000 - totalJPY).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Profit ($):</span>
                <span>${((500000 / fxRate) - totalUSD).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-600 text-white">Print</Button>
        </div>
      </div>
    </div>
  );
}
