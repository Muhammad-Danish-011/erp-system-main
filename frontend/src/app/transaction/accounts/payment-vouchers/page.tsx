"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function FinanceVoucherForm() {
  return (
    <div className="p-6 max-w-5xl mx-auto border rounded-lg shadow bg-white">
      {/* Top Buttons */}
      <div className="flex gap-3 mb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white"> Save</Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white"> Update</Button>
        <Button className="bg-red-600 hover:bg-red-700 text-white"> Delete</Button>
        <Button className="bg-gray-500 hover:bg-gray-600 text-white"> Clear</Button>
      </div>

      {/* Form Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Voucher Code:</label>
            <Input className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Amount:</label>
            <Input type="number" className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Country:</label>
            <select className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">Please Select an Option</option>
              <option value="pk">Pakistan</option>
              <option value="jp">Japan</option>
              <option value="us">USA</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Currency:</label>
            <select className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">USD</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="pkr">PKR</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Payer Name:</label>
            <Input className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Customer:</label>
            <Input className="flex-1" />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Voucher Date:</label>
            <Input type="date" className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Cheque Date:</label>
            <Input type="date" className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Company:</label>
            <select className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">Please Select an Option</option>
              <option value="toyota">Toyota</option>
              <option value="suzuki">Suzuki</option>
              <option value="honda">Honda</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Bank:</label>
            <select className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">Please Select an Option</option>
              <option value="hbl">HBL</option>
              <option value="ubl">UBL</option>
              <option value="mcb">MCB</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm font-medium">Cheque Number:</label>
            <Input className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
