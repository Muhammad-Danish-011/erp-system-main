"use client";

import { useEffect, useState } from "react";
import { ApiClient, Order } from "@/lib/api-client";
import { Modal } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { OrderForm } from "@/components/orders/order-form";

const client = new ApiClient();

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await client.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Partial<Order>) => {
    try {
      if (selectedOrder) {
        await client.updateOrder(selectedOrder.id, {
          ...selectedOrder,
          ...formData,
        } as Order);
      } else {
        await client.createOrder(formData as Order);
      }
      await fetchOrders();
      setIsModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error saving order:", err);
      setError("Failed to save order");
    }
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (
      confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      try {
        await client.deleteOrder(id);
        await fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
        setError("Failed to delete order");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button
          onClick={() => {
            setSelectedOrder(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add Order
        </button>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer
                      ? `${order.customer.firstName} ${order.customer.lastName}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.trackingNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => {
            setSelectedOrder(null);
          }, 200);
        }}
        title={selectedOrder ? "Edit Order" : "Add Order"}
      >
        <div className="space-y-6">
          <OrderForm
            initialData={selectedOrder}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setTimeout(() => {
                setSelectedOrder(null);
              }, 200);
            }}
          />

          {selectedOrder && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedOrder.id)}
                  className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete Order
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
