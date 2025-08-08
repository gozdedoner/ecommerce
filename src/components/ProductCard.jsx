import { useId, useState } from "react";

export default function ProductCard({ product, onAdd }) {
  const selectId = useId();
  const [variant, setVariant] = useState(product.variants?.[0] ?? "");

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const handleAdd = () => {
    if (!product.inStock) return;
    onAdd?.(product, variant || undefined);
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
      }}
    >
      {/* Görsel */}
      <div className="ratio ratio-4x3 bg-light">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
      </div>

      {/* İçerik */}
      <div className="card-body d-flex flex-column gap-2">
        <h5 className="card-title mb-1">{product.name}</h5>
        <p className="fw-bold mb-2">{formattedPrice}</p>

        {product.variants?.length ? (
          <div className="d-flex align-items-center gap-2">
            <label
              htmlFor={selectId}
              className="form-label mb-0 small text-muted"
            >
              Variant
            </label>
            <select
              id={selectId}
              className="form-select form-select-sm w-auto border-secondary"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              {product.variants.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="badge bg-light text-dark">Single option</span>
        )}

        {product.inStock ? (
          <button
            className="btn btn-dark mt-1"
            style={{ transition: "background 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="btn btn-secondary mt-1"
            disabled
            title="Out of Stock"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
