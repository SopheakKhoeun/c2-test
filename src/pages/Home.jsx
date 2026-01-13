import { Link } from "react-router-dom";
import products from "../assets/data/products.json";
import { useState, useEffect } from "react";

export default function Home() {
  const items = products;
  const [categories, setCategories] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Featured: first 4 items (simple + predictable for practice)
  const featured = items.slice(0, 4);

//Fetch  categories and products 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("https://api.escuelajs.co/api/v1/categories?limit=4"),
          fetch(
            "https://api.escuelajs.co/api/v1/products?limit=12&offset=12"
          ),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setCategories(categoriesData);
        setLatest(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading content...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="rounded-2xl border bg-white p-5">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            New arrivals
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-tight">
            Discover products you’ll love
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Browse categories, view latest items, and manage products & users in
            one simple app.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              to="/products"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Explore products
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-3 w-full">
          <div className="flex items-end justify-between w-full">
            <h2 className="text-lg font-semibold">Featured products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="block w-full rounded-2xl border bg-white p-4 hover:shadow-sm transition"
              >
                {/* Image – 100% width */}
                <img
                  src={p.images?.[0] ?? "https://placehold.co/600x400"}
                  alt={p.title}
                  className="mb-3 h-48 w-full rounded-xl object-cover"
                  loading="lazy"
                />

                {/* Content – 100% width */}
                <div className="w-full space-y-1">
                  {/* Title + Price */}
                  <div className="flex w-full items-start justify-between gap-2">
                    <h3 className="truncate font-medium">{p.title}</h3>
                    <span className="shrink-0 font-semibold">${p.price}</span>
                  </div>

                  {/* Category */}
                  <div className="text-xs text-slate-600">
                    {p.category?.name}
                  </div>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>


        {/* Categories */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Categories</h2>

          <div className="space-y-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-12 w-12 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="truncate font-medium">{c.name}</div>
                  <div className="text-xs text-slate-600">Tap to browse</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Products */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Latest products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {latest.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="block rounded-2xl border bg-white p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.images?.[0] ?? "https://placehold.co/600x400"}
                    alt={p.title}
                    className="h-14 w-14 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="truncate font-medium">{p.title}</div>
                      <div className="shrink-0 text-sm font-semibold">
                        ${p.price}
                      </div>
                    </div>
                    <div className="truncate text-xs text-slate-600">
                      {p.category?.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
