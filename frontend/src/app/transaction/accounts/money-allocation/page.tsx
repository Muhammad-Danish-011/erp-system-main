"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AllocateMoneyModal from "@/components/Modals/moneyAllocation/AllocateMoneyModal";
import UploadDocumentMoneyAllocationModal from "@/components/Modals/moneyAllocation/UploadDocument";
import VehicleCostModal from "@/components/Modals/moneyAllocation/costing";

type RowData = {
  stockCode: string;
  carName: string;
  documents: string;
  chassis: string;
  reserveDays: number;
  paid: number;
  balance: number;
  assigned: number;
  allocatedAmt: number;
  totalCnf: number;
  sureCheck: boolean;
  shipOk: boolean;
  shipOkDate?: string;
  shipHold: boolean;
  afterDue: number;
};

const data: RowData[] = [
  {
    stockCode: "JP11132",
    carName: "2012 SUZUKI JIMNY",
    documents: "Upload",
    chassis: "JB23W-672160", 
    reserveDays: 3,
    paid: 100,
    balance: 0,
    assigned: 100,
    allocatedAmt: 5822,
    totalCnf: 5822,
    sureCheck: false,
    shipOk: true,
    shipOkDate: "2024-05-14",
    shipHold: false,
    afterDue: 0
  },
  {
    stockCode: "JP11134",
    carName: "2015 BMW 5 SERIES XG20",
    documents: "Upload",
    chassis: "WBA5A3200DF799999",
    reserveDays: 3,
    paid: 100,
    balance: 0,
    assigned: 100,
    allocatedAmt: 8800,
    totalCnf: 8800,
    sureCheck: false,
    shipOk: true,
    shipOkDate: "2024-05-14",
    shipHold: false,
    afterDue: 0
  },
  {
    stockCode: "JP11135", 
    carName: "2018 TOYOTA CAMRY",
    documents: "Upload",
    chassis: "4T1B11HK5JU123456",
    reserveDays: 5,
    paid: 75,
    balance: 25,
    assigned: 75,
    allocatedAmt: 12000,
    totalCnf: 12000,
    sureCheck: true,
    shipOk: false,
    shipOkDate: "2024-06-01",
    shipHold: true,
    afterDue: 2
  },
  {
    stockCode: "JP11136",
    carName: "2019 HONDA CIVIC",
    documents: "Upload",
    chassis: "2HGFC2F54KH123789",
    reserveDays: 4,
    paid: 50,
    balance: 50,
    assigned: 50,
    allocatedAmt: 9500,
    totalCnf: 9500,
    sureCheck: false,
    shipOk: false,
    shipOkDate: "2024-06-15",
    shipHold: false,
    afterDue: 1
  }
];


export default function MoneyAllocationPage() {
  const [modalOpen, setModalOpen] = useState<null | { type: string; row: RowData }>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (type: string, row: RowData) => {
    setModalOpen({ type, row });
  };

  const closeModal = () => setModalOpen(null);

  return (
    <div className="p-4 space-y-4">
      {/* Top Buttons */}
      <div className="flex gap-2">
        <Button className="bg-blue-600 text-white">Save</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
        <Button className="bg-gray-500 text-white">Clear</Button>
      </div>

      {/* Table */}
      <div className="overflow-auto border border-gray-300">
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Stock Code</TableHead>
              <TableHead>Car Name</TableHead>
              <TableHead>Allocate Money</TableHead>
              <TableHead>Costing</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Chassis</TableHead>
              <TableHead>Reserve Days</TableHead>
              <TableHead>Paid %</TableHead>
              <TableHead>Balance %</TableHead>
              <TableHead>Assigned %</TableHead>
              <TableHead>Allocated Amt</TableHead>
              <TableHead>Total CNF</TableHead>
              <TableHead>Sure Check</TableHead>
              <TableHead>Ship Ok</TableHead>
              <TableHead>Ship Ok Date</TableHead>
              <TableHead>Ship Hold</TableHead>
              <TableHead>After Due</TableHead>
            </TableRow>

            {/* Filter Row */}
            <TableRow>
              <TableCell></TableCell>
              {Array.from({ length: 17 }).map((_, i) => (
                <TableCell key={i}>
                  <input
                    type="text"
                    className="w-full border border-gray-300 text-xs px-1 py-0.5"
                    placeholder="Filter..."
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.stockCode}
                className={cn(row.paid === 100 ? "bg-green-100" : "bg-red-100")}
              >
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{row.stockCode}</TableCell>
                <TableCell>{row.carName}</TableCell>
                <TableCell>
                  <button
                    className="text-blue-600 underline"
                    onClick={() => openModal("Allocate Money", row)}
                  >
                    Allocate Money
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="text-blue-600 underline"
                      onClick={() => openModal("Costing", row)}
                  >
                    Costing
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="text-blue-600 underline"
                    onClick={() => openModal("Upload", row)}
                  >
                    {row.documents}
                  </button>
                </TableCell>
                <TableCell>{row.chassis}</TableCell>
                <TableCell>{row.reserveDays}</TableCell>
                <TableCell>{row.paid}</TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell>{row.assigned}</TableCell>
                <TableCell>{row.allocatedAmt}</TableCell>
                <TableCell>{row.totalCnf}</TableCell>
                <TableCell>
                  <input type="checkbox" checked={row.sureCheck} readOnly />
                </TableCell>
                <TableCell>
                  <input type="checkbox" checked={row.shipOk} readOnly />
                </TableCell>
                <TableCell>{row.shipOkDate}</TableCell>
                <TableCell>
                  <input type="checkbox" checked={row.shipHold} readOnly />
                </TableCell>
                <TableCell>{row.afterDue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      {modalOpen?.type === "Allocate Money" && (
        <AllocateMoneyModal
          isOpen={true}
          onClose={closeModal}
          customerCode="GYC1001"
          customerName="Richard"
          stockName={modalOpen.row.carName}
          allocatedRatio={100}
          depositRatio={50}
          accountBalance={25}
          stockInAccount={2}
          lastUpdated="5/14/2024"
          transactions={[
            {
              date: "Wednesday, February 14, 2024",
              reference: "Payment Received Against Voucher: VO01-20240213",
              amount: 2936,
              balance: 2936
            },
            {
              date: "Friday, February 16, 2024",
              reference: `Money Allocation on ${modalOpen.row.stockCode} - ${modalOpen.row.carName}`,
              amount: -2911,
              balance: 25
            }
          ]}
          onAddAmount={(amt) => console.log("Amount added:", amt)}
        />
      )}

      {modalOpen?.type === "Upload" && (
        <UploadDocumentMoneyAllocationModal
          isOpen={true}
          onClose={closeModal}
          onAddAmount={(amt) => console.log("Amount added:", amt)}
        />
      )}

      {modalOpen?.type === "Costing" && (
  <VehicleCostModal
    isOpen={true}
    onClose={closeModal}
    vehicleId={modalOpen.row.stockCode}
    vehicleName={modalOpen.row.carName}
  />
)}
    </div>
  );
}
