import Link from "next/link";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();

  return (
    <div className="p-4">
      <ul>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Products</h1>
            <Link
              href="/products/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              + Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <Link
                  href={`/products/${p._id}`}
                  key={p._id}
                  className="p-4 border rounded-md hover:shadow-md transition"
                >
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-gray-600">${p.price}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}
