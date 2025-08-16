"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface Customer {
  name: string;
  country: string;
  email: string;
  assignedTo: string;
}

const initialData: Customer[] = [
  { name: "Aaron", country: "Zimbabwe", email: "ryahondz@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Zedias", country: "Zimbabwe", email: "zediaschimuz@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Dylan", country: "Zimbabwe", email: "QualityCars@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "IDDY ABDUL", country: "Tanzania", email: "Yosamlogistics@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Lintrix", country: "Zimbabwe", email: "lintrixinvestments@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Caution Madiro", country: "Zimbabwe", email: "vachikonamombe@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Peter Mahara", country: "Zimbabwe", email: "piemahara@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Royal motors", country: "Zimbabwe", email: "royalmotors19@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "SeCautions World Ve..", country: "Zimbabwe", email: "sckmybusiness@gmail.com", assignedTo: "Faraz Abbas" },
  { name: "Freeborn", country: "Zimbabwe", email: "FreebornDhlakama@gmail.com", assignedTo: "Waqas Abbasi" },
  { name: "Harvey", country: "Zambia", email: "HarveyChangawa@gmail.com", assignedTo: "Waqas Abbasi" },
  { name: "WenaJoe", country: "Zambia", email: "Joe_kashempa@yahoo.com", assignedTo: "Waqas Abbasi" },
  { name: "Owen Simbarashe", country: "Zimbabwe", email: "Osamtamai@gmail.com", assignedTo: "M Wassay" },
  { name: "Chrispen", country: "Zimbabwe", email: "chrispenmachaurira@gmail.com", assignedTo: "M Wassay" },
  { name: "Patrick", country: "Zimbabwe", email: "patricksmucha@gmail.com", assignedTo: "M Wassay" },
  { name: "Hubert", country: "Zimbabwe", email: "hmafuso@gmail.com", assignedTo: "M Wassay" },
  { name: "definate", country: "Zimbabwe", email: "defyfmseba@gmail.com", assignedTo: "M Wassay" },
  { name: "Leone", country: "Zimbabwe", email: "njoevtech@gmail.com", assignedTo: "M Wassay" },
  { name: "Billy", country: "Zimbabwe", email: "chikwadzebill@gmail.com", assignedTo: "M Wassay" },
  { name: "Ronald", country: "Zimbabwe", email: "ronaldtizimbudzana@gmail.com", assignedTo: "M Wassay" },
  { name: "Leon", country: "Zimbabwe", email: "XXXXXXXXXXXXXXX@gmail.com", assignedTo: "M Wassay" },
  { name: "Blessing", country: "Zimbabwe", email: "blessingblizmunyor045@gmail.com", assignedTo: "M Wassay" },
  { name: "Abel", country: "Zimbabwe", email: "princelokw@gmail.com", assignedTo: "M Wassay" },
  { name: "MULENGA", country: "Zambia", email: "MULENGASHAD@YAHOO.CO.UK", assignedTo: "Moiz Ahmed Siddique" },
  { name: "Mbele", country: "Zimbabwe", email: "MbeleLogistics@gmail.com", assignedTo: "Waqas Abbasi" },
];

export default function CustomerApprovalPage() {
  const [approveList, setApproveList] = useState<string[]>([]);
  const [rejectList, setRejectList] = useState<string[]>([]);
  const [filters, setFilters] = useState({ name: "", country: "", email: "", assignedTo: "" });

  const handleCheckbox = (email: string, type: "approve" | "reject") => {
    if (type === "approve") {
      setApproveList(prev =>
        prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
      );
      setRejectList(prev => prev.filter(e => e !== email));
    } else {
      setRejectList(prev =>
        prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
      );
      setApproveList(prev => prev.filter(e => e !== email));
    }
  };

  const filteredData = initialData.filter(
    c =>
      c.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      c.country.toLowerCase().includes(filters.country.toLowerCase()) &&
      c.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      c.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())
  );

  return (
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b">
              <h1 className="text-2xl font-semibold">New Customer Approval</h1>
            </div>

            {/* Table */}
            <div className="max-h-[calc(100vh-300px)] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20 text-center">Approve</TableHead>
                    <TableHead className="w-20 text-center">Reject</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Country Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>AssignedTo</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Contains:"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={filters.name}
                        onChange={e => setFilters({ ...filters, name: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Contains:"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={filters.country}
                        onChange={e => setFilters({ ...filters, country: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Contains:"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={filters.email}
                        onChange={e => setFilters({ ...filters, email: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Contains:"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={filters.assignedTo}
                        onChange={e => setFilters({ ...filters, assignedTo: e.target.value })}
                      />
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((c, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={approveList.includes(c.email)}
                          onChange={() => handleCheckbox(c.email, "approve")}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={rejectList.includes(c.email)}
                          onChange={() => handleCheckbox(c.email, "reject")}
                        />
                      </TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.country}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t">
              <button className="px-6 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}
