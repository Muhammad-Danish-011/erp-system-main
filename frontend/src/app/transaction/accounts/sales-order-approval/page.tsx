"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type RowData = {
  salesOrderNo: string;
  approved: boolean;
  rejected: boolean;
  carName: string;
  customerCode: string;
  stockCode: string;
  vehicleName: string;
  name: string;
  country: string;
  destination: string;
  port: string;
  blType: string;
  shipment: string;
  incoTerm: string;
};

const data: RowData[] = [
  {
    salesOrderNo: "SO-1001",
    approved: true,
    rejected: false,
    carName: "2012 SUZUKI JIMNY",
    customerCode: "CUST-001",
    stockCode: "JP11132",
    vehicleName: "SUZUKI JIMNY",
    name: "Richard",
    country: "Japan",
    destination: "Kenya",
    port: "Mombasa",
    blType: "Original",
    shipment: "By Sea",
    incoTerm: "FOB",
  },
];

export default function salesOrderApproval() {
  return (
    <div className="p-6 space-y-6">
       <h1 className="text-3xl font-bold text-center mb-8 text-white">Sales Order Approval</h1>
      {/* Top Buttons */}
      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Update</Button>
        <Button className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
        <Button className="bg-gray-500 hover:bg-gray-600 text-white">Clear</Button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border border-gray-300 shadow">
        <Table>
          {/* Header */}
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-12 text-center"></TableHead>
              <TableHead className="text-center">Sales Order No</TableHead>
              <TableHead className="text-center">Approved</TableHead>
              <TableHead className="text-center">Rejected</TableHead>
              <TableHead className="text-center">Car Name</TableHead>
              <TableHead className="text-center">Customer Code</TableHead>
              <TableHead className="text-center">Stock Code</TableHead>
              <TableHead className="text-center">Vehicle Name</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Country</TableHead>
              <TableHead className="text-center">Destination</TableHead>
              <TableHead className="text-center">Port</TableHead>
              <TableHead className="text-center">BL Type</TableHead>
              <TableHead className="text-center">Shipment</TableHead>
              <TableHead className="text-center">Inco Term</TableHead>
            </TableRow>

            {/* Filter Row */}
            <TableRow className="bg-gray-50">
              <TableCell></TableCell>
              {Array.from({ length: 14 }).map((_, i) => (
                <TableCell key={i}>
                  <input
                    type="text"
                    className="w-full border border-gray-300 text-xs px-2 py-1 rounded focus:ring-1 focus:ring-blue-400"
                    placeholder="Filter..."
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {data.map((row, idx) => (
                        <TableRow className="hover:bg-gray-100 bg-white">
            
                <TableCell className="text-center">
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="text-center">{row.salesOrderNo}</TableCell>
                <TableCell className="text-center">
                  <input type="checkbox" checked={row.approved} readOnly />
                </TableCell>
                <TableCell className="text-center">
                  <input type="checkbox" checked={row.rejected} readOnly />
                </TableCell>
                <TableCell className="text-center">{row.carName}</TableCell>
                <TableCell className="text-center">{row.customerCode}</TableCell>
                <TableCell className="text-center">{row.stockCode}</TableCell>
                <TableCell className="text-center">{row.vehicleName}</TableCell>
                <TableCell className="text-center">{row.name}</TableCell>
                <TableCell className="text-center">{row.country}</TableCell>
                <TableCell className="text-center">{row.destination}</TableCell>
                <TableCell className="text-center">{row.port}</TableCell>
                <TableCell className="text-center">{row.blType}</TableCell>
                <TableCell className="text-center">{row.shipment}</TableCell>
                <TableCell className="text-center">{row.incoTerm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
