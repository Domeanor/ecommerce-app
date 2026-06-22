import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ShopNext
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <span>Cart</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
              0
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
