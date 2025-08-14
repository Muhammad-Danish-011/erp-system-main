"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product } from "@/lib/api-client";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be positive"),
  stockQuantity: z.number().int().min(0, "Stock quantity must be positive"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  specifications: z.string(),
  costPrice: z.number().min(0, "Cost price must be positive"),
  supplierInfo: z.string(),
  isActive: z.boolean(),
  warrantyInfo: z.string(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      isActive: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700"
          >
            SKU
          </label>
          <input
            type="text"
            id="sku"
            {...register("sku")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.sku && (
            <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register("price", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="costPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Cost Price
          </label>
          <input
            type="number"
            step="0.01"
            id="costPrice"
            {...register("costPrice", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.costPrice && (
            <p className="mt-1 text-sm text-red-600">
              {errors.costPrice.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="stockQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            {...register("stockQuantity", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.stockQuantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stockQuantity.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            {...register("brand")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="specifications"
            className="block text-sm font-medium text-gray-700"
          >
            Specifications
          </label>
          <textarea
            id="specifications"
            rows={3}
            {...register("specifications")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.specifications && (
            <p className="mt-1 text-sm text-red-600">
              {errors.specifications.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="supplierInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Supplier Information
          </label>
          <input
            type="text"
            id="supplierInfo"
            {...register("supplierInfo")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.supplierInfo && (
            <p className="mt-1 text-sm text-red-600">
              {errors.supplierInfo.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="warrantyInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Warranty Information
          </label>
          <input
            type="text"
            id="warrantyInfo"
            {...register("warrantyInfo")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.warrantyInfo && (
            <p className="mt-1 text-sm text-red-600">
              {errors.warrantyInfo.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-700"
            >
              Active Product
            </label>
          </div>
          {errors.isActive && (
            <p className="mt-1 text-sm text-red-600">
              {errors.isActive.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}
