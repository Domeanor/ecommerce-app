import { PackageX } from "lucide-react";
import { serverFetch } from "@/infra/helpers/serverFetch";
import ProductDetail from "./_components/ProductDetail";
import ErrorState from "@/components/ErrorState";
import { Product } from "@/types/product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await serverFetch<Product>(
    `https://dummyjson.com/products/${id}`
  );

  if (error) {
    return (
      <ErrorState icon={PackageX} title="Product not found" message={error} />
    );
  }

  return <ProductDetail product={data!} />;
}
