import { PackageX } from "lucide-react";
import { serverFetch } from "@/infra/helpers/serverFetch";
import ProductDetail from "./_components/ProductDetail";
import ErrorState from "@/components/ErrorState";
import { Product } from "@/types/product";

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  const { data, error } = await serverFetch<Product>(
    `https://dummyjson.com/products/${id}`
  );

  if (error) {
    return (
      <ErrorState icon={PackageX} title="Product not found" message={error} />
    );
  }

  const backHref = page ? `/?page=${page}` : "/";

  return <ProductDetail product={data!} backHref={backHref} />;
}
