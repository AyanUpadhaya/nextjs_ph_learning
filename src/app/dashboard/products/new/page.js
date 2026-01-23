"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
    });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });
      if (res.ok) router.push("/products");
    };

     return (
       <div className="p-6 max-w-md mx-auto">
         <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
         <form onSubmit={handleSubmit} className="space-y-4">
           <input
             name="name"
             placeholder="Product Name"
             value={form.name}
             onChange={handleChange}
             className="w-full border p-2 rounded-md"
             required
           />
           <textarea
             name="description"
             placeholder="Description"
             value={form.description}
             onChange={handleChange}
             className="w-full border p-2 rounded-md"
           />
           <input
             name="price"
             type="number"
             placeholder="Price"
             value={form.price}
             onChange={handleChange}
             className="w-full border p-2 rounded-md"
             required
           />
           <input
             name="category"
             placeholder="Category"
             value={form.category}
             onChange={handleChange}
             className="w-full border p-2 rounded-md"
           />
           <button
             type="submit"
             className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700"
           >
             Create Product
           </button>
         </form>
       </div>
     );
}