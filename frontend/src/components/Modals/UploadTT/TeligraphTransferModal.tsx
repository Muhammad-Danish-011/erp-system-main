"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

type Transaction = {
  date: string;
  reference: string;
  amount: number;
  balance: number;
};

interface TeligraphTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Voucher = {
  id: number;
  voucherCode: string;
  amount: number;
  payerName: string;
  bankName: string;
  currency: string;
  countryName: string;
};

export default function TeligraphTransferModal({
  isOpen,
  onClose,
}: TeligraphTransferModalProps) {
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: 1,
      voucherCode: "VCH-001",
      amount: 1500,
      payerName: "Ali Khan",
      bankName: "HBL",
      currency: "PKR",
      countryName: "Pakistan",
    },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded shadow-lg p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-center">
          Selected Payment
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voucher Code</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payer Name</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Country Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.voucherCode}</TableCell>
                <TableCell>{voucher.amount}</TableCell>
                <TableCell>{voucher.payerName}</TableCell>
                <TableCell>{voucher.bankName}</TableCell>
                <TableCell>{voucher.currency}</TableCell>

                <TableCell>{voucher.countryName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="flex justify-between gap-2 mt-4">
          <div className="flex flex-col">
            {/* <label className="text-sm font-medium">Select Option</label> */}
            <div>
              <span>Select customer Payment is received from :</span>
              <select
                value={" "}
                // onChange={(e) => setVehicleType(e.target.value)}
                className="w-56 border border-gray-300 rounded-md p-1 ml-2"
              >
                <option value="">Please select an option</option>
                <option value="Cars">one</option>
                <option value="Trucks">two</option>
                <option value="HeavyMachinery">three</option>
              </select>
            </div>
          </div>

          <div className="">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>

            <Button
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
              onClick={() => {
                alert("Upload TT functionality is not implemented yet.");
              }}
            >
              Upload TT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
