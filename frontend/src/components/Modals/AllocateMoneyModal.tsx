"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Transaction = {
  date: string;
  reference: string;
  amount: number;
  balance: number;
};

interface AllocateMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerCode: string;
  customerName: string;
  stockName: string;
  allocatedRatio: number;
  depositRatio: number;
  accountBalance: number;
  stockInAccount: number;
  lastUpdated: string;
  transactions: Transaction[];
  onAddAmount: (amount: number) => void;
}

export default function AllocateMoneyModal({
  isOpen,
  onClose,
  customerCode,
  customerName,
  stockName,
  allocatedRatio,
  depositRatio,
  accountBalance,
  stockInAccount,
  lastUpdated,
  transactions,
  onAddAmount
}: AllocateMoneyModalProps) {
  const [amount, setAmount] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded shadow-lg p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">Money Allocation to Sales Order</h2>

        {/* Deposit Ratio */}
        <div className="text-right text-2xl font-bold text-red-600 mb-4">
          Deposit Ratio as per Sales Order: {depositRatio}%
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left Info */}
          <div className="col-span-2 space-y-2">
            <p>
              <strong>Customer Code:</strong> {customerCode}
            </p>
            <p>
              <strong>Customer Name:</strong> {customerName}
            </p>
            <p>
              <strong>Stock Name:</strong>{" "}
              <input
                type="text"
                value={stockName}
                readOnly
                className="border border-gray-300 px-2 py-1 w-64"
              />
            </p>
            <p className="flex items-center gap-2">
              <strong>Allocated Ratio:</strong>{" "}
              <span className="text-green-600 text-2xl font-bold">
                {allocatedRatio}%
              </span>
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="border border-gray-300 px-2 py-1 w-32"
              />
            </p>
            <Button
              className="bg-blue-600 text-white"
              onClick={() => onAddAmount(amount)}
            >
              Add Amount
            </Button>
          </div>

          {/* Right Info Box */}
          <div className="border border-gray-300 rounded p-4 text-center">
            <h3 className="text-lg font-semibold">Account Balance</h3>
            <div className="text-3xl font-bold">{accountBalance}</div>
            <p className="text-sm text-gray-600">{stockInAccount} stock in account</p>
            <p className="text-xs text-gray-500 mt-2">
              last updated on {lastUpdated}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-6 border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Trx Date</th>
                <th className="border p-2">Reference</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, idx) => (
                <tr
                  key={idx}
                  className={idx === 0 ? "bg-yellow-100" : ""}
                >
                  <td className="border p-2">{trx.date}</td>
                  <td className="border p-2">{trx.reference}</td>
                  <td className="border p-2">{trx.amount.toLocaleString()}</td>
                  <td className="border p-2">{trx.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
