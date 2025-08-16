"use client";
import React, { useState } from 'react'
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "@/components/ui/table";
import { Search } from 'lucide-react';
import TeligraphTransferModal from '@/components/Modals/UploadTT/TeligraphTransferModal';
import ApproveRejectVoucherModal from '@/components/Modals/acknowledgedTT/acknowledgeTT';

type Voucher = {
    voucherCode: string;
    amount: number;
    payerName: string;
    bankName: string;
    currency: string;
    countryName: string;
};

function AcknowledgementTT() {

    // ✅ State to control modal
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // ✅ Function to open modal
    const openModal = () => setModalOpen(true);

    // ✅ Function to close modal
    const closeModal = () => setModalOpen(false);

    const [vehicleType, setVehicleType] = useState("Cars");
    const [makeName, setMakeName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<Voucher | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([
        {
            voucherCode: "VCH-001",
            amount: 1500,
            payerName: "Ali Khan",
            bankName: "HBL",
            currency: "PKR",
            countryName: "Pakistan",
        },
        {
            voucherCode: "VCH-002",
            amount: 2000,
            payerName: "John Smith",
            bankName: "HSBC",
            currency: "USD",
            countryName: "USA",
        },
        {
            voucherCode: "VCH-003",
            amount: 1800,
            payerName: "Ahmed Raza",
            bankName: "Meezan Bank",
            currency: "PKR",
            countryName: "Pakistan",
        },
        {
            voucherCode: "VCH-004",
            amount: 2200,
            payerName: "Hiro Tanaka",
            bankName: "Mizuho Bank",
            currency: "JPY",
            countryName: "Japan",
        },
        {
            voucherCode: "VCH-005",
            amount: 2500,
            payerName: "Maria Garcia",
            bankName: "Santander",
            currency: "EUR",
            countryName: "Spain",
        },
    ]);

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Acknowledgement-TT</h1>
            {/* Table */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="relative mb-4 w-64">
                    <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Enter text to search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Voucher Code</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payer Name</TableHead>
                            <TableHead>Bank Name</TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Country Name</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vouchers.map((voucher) => (
                            <TableRow key={voucher.voucherCode}>
                                <TableCell>{voucher.voucherCode}</TableCell>
                                <TableCell>{voucher.amount}</TableCell>
                                <TableCell>{voucher.payerName}</TableCell>
                                <TableCell>{voucher.bankName}</TableCell>
                                <TableCell>{voucher.currency}</TableCell>
                                <TableCell>{voucher.countryName}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={openModal}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Take Action
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Modal */}
                {modalOpen && (
                    <ApproveRejectVoucherModal
                        open={modalOpen}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    )
}

export default AcknowledgementTT;
