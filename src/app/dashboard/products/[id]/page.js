"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setForm(data);
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
      }),
    });
    if (res.ok) {
      setEditMode(false);
      router.push("/products");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/products");
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      {!editMode ? (
        <>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">${product.price}</p>
          <p>{product.description}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
