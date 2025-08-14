import { useState } from "react";
import { Supplier } from "@/lib/api-client";

interface SupplierFormProps {
  initialData?: Supplier | null;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
}

export function SupplierForm({
  initialData,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const [formData, setFormData] = useState<Partial<Supplier>>({
    companyName: initialData?.companyName || "",
    contactName: initialData?.contactName || "",
    contactTitle: initialData?.contactTitle || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    country: initialData?.country || "",
    postalCode: initialData?.postalCode || "",
    taxIdentificationNumber: initialData?.taxIdentificationNumber || "",
    paymentTerms: initialData?.paymentTerms || "",
    bankAccountDetails: initialData?.bankAccountDetails || "",
    creditLimit: initialData?.creditLimit || 0,
    rating: initialData?.rating || "0",
    isActive: initialData?.isActive ?? true,
    notes: initialData?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="contactName"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Name
        </label>
        <input
          type="text"
          name="contactName"
          id="contactName"
          value={formData.contactName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating (1-5)
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={formData.rating}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          min="1"
          max="5"
          required
        />
      </div>

      <div>
        <label
          htmlFor="creditLimit"
          className="block text-sm font-medium text-gray-700"
        >
          Credit Limit
        </label>
        <input
          type="number"
          name="creditLimit"
          id="creditLimit"
          value={formData.creditLimit}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Active Supplier
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
