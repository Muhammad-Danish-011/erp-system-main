"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UploadDocumentMoneyAllocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddAmount: (amount: number) => void;
}

export default function UploadDocumentMoneyAllocationModal({
    isOpen,
    onClose,
    onAddAmount
}: UploadDocumentMoneyAllocationModalProps) {
    const [amount, setAmount] = useState<number>(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[900px] rounded shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">2018 Toyota Hilux Revo</h2>
                    <div className="text-2xl font-bold text-red-600">
                        Uploaded Documents Details
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Left Column - Two document sections */}
                    <div className="col-span-2 space-y-6">
                        {/* Bill of Lading */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Bill of Lading</h3>
                            <div className="flex gap-2">
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    Pick Document
                                </Button>
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>

                        {/* Inspection Certificate */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Inspection Certificate</h3>
                            <div className="flex gap-2">
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    Pick Document
                                </Button>
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Two document sections */}
                    <div className="col-span-1 space-y-6">
                        {/* Export Certificate */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Export Certificate</h3>
                            <div className="flex gap-2">
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    Pick Document
                                </Button>
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>

                        {/* Auction Sheet */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Auction Sheet</h3>
                            <div className="flex gap-2">
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    Pick Document
                                </Button>
                                <Button
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => onAddAmount(amount)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with separator line */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700" 
                            onClick={() => onAddAmount(amount)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}