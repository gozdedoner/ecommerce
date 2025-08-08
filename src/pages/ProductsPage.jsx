import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function ProductsPage() {
  const handleAdd = (p, variant) => {
    alert(`Added: ${p.name}${variant ? ` (${variant})` : ""}`);
  };

  return (
    <div className="container my-4">
      <div className="row g-3">
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={p.id}>
            <ProductCard product={p} onAdd={handleAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}
