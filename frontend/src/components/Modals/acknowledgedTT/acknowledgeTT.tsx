"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ApproveRejectVoucherModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-cyan-600">
              VO02-20250804
            </DialogTitle>
            <span className="text-xl font-semibold italic text-cyan-500">
              Voucher Details
            </span>
          </div>
        </DialogHeader>

        <div className="border-t my-2" />

        {/* Form */}
        <div className="grid grid-cols-2 gap-6 py-4 ">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Amount:</label>
              <Input defaultValue="39452.00" className="flex-1" />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Country:</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Zimbabwe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zw">Zimbabwe</SelectItem>
                  <SelectItem value="pk">Pakistan</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Currency:</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="pkr">PKR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Payer Name:</label>
              <Input defaultValue="Johnson Moyo" className="flex-1" />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Voucher Date:</label>
              <Input type="date" defaultValue="2025-08-04" className="flex-1" />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Bank:</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hbl">HBL</SelectItem>
                  <SelectItem value="ubl">UBL</SelectItem>
                  <SelectItem value="mcb">MCB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Cheque Number:</label>
              <Input defaultValue="S06521601E0F01" className="flex-1" />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-sm font-medium">Cheque Date:</label>
              <Input type="date" defaultValue="2025-08-04" className="flex-1" />
            </div>
          </div>
        </div>

        <div className="border-t my-2" />

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Check Submitted TT
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Approve Voucher
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Reject Voucher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
