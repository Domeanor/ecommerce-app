export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Product Detail</h1>
      <p className="mt-2 text-gray-500">
        Detail page for product ID: <strong>{id}</strong> — full product info
        will be displayed here.
      </p>
    </div>
  );
}
