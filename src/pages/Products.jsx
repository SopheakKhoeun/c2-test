import { Link } from "react-router-dom";
// import products from "../assets/data/products.json";
import { useState, useEffect } from "react";

export default function Products() {
  // const items = products;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Fetch products.

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch(
          "https://api.escuelajs.co/api/v1/products?limit=12&offset=12"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage your product catalog</p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add product
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/products/${p.id}`}
          className="flex flex-row md:flex-col gap-3 rounded-xl border bg-white p-4 hover:shadow-sm transition"
        >
          {/* Image */}
          <img
            src={p.images?.[0] ?? "https://placehold.co/600x400"}
            alt={p.title}
            className="
              h-20 w-20 shrink-0 rounded-lg object-cover
              md:h-40 md:w-full
            "
            loading="lazy"
          />

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between min-w-0">
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium line-clamp-1">
                  {p.title}
                </div>
                <div className="text-sm text-slate-600 line-clamp-1">
                  {p.category?.name}
                </div>
              </div>
              <div className="shrink-0 font-semibold">
                ${p.price}
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {p.description}
            </p>
          </div>
        </Link>
      ))}
    </div>

    </div>
  );
}
