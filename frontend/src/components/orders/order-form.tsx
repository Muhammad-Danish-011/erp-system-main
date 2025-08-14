import { useState, useEffect } from "react";
import { ApiClient, Order, Customer } from "@/lib/api-client";

interface OrderFormProps {
  initialData?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
  onCancel: () => void;
}

const client = new ApiClient();

export function OrderForm({ initialData, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<Partial<Order>>({
    customerId: initialData?.customerId || 0,
    orderDate: initialData?.orderDate || new Date().toISOString().split("T")[0],
    orderStatus: initialData?.orderStatus || "Pending",
    totalAmount: initialData?.totalAmount || 0,
    taxAmount: initialData?.taxAmount || 0,
    shippingCost: initialData?.shippingCost || 0,
    shippingAddress: initialData?.shippingAddress || "",
    paymentStatus: initialData?.paymentStatus || "Pending",
    paymentMethod: initialData?.paymentMethod || "",
    trackingNumber: initialData?.trackingNumber || "",
    shippedDate: initialData?.shippedDate || "",
    deliveredDate: initialData?.deliveredDate || "",
    notes: initialData?.notes || "",
    orderItems: initialData?.orderItems || [],
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await client.getCustomers();
        setCustomers(customersData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="customerId"
          className="block text-sm font-medium text-gray-700"
        >
          Customer
        </label>
        <select
          name="customerId"
          id="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName} - {customer.companyName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="orderDate"
          className="block text-sm font-medium text-gray-700"
        >
          Order Date
        </label>
        <input
          type="date"
          name="orderDate"
          id="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="orderStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="orderStatus"
          id="orderStatus"
          value={formData.orderStatus}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="paymentStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Status
        </label>
        <select
          name="paymentStatus"
          id="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="trackingNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Tracking Number
        </label>
        <input
          type="text"
          name="trackingNumber"
          id="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
        />
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
