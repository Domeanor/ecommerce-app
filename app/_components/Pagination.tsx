import Link from "next/link";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import { cn } from "@/infra/helpers/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const COLLAPSE_THRESHOLD = 7;

export function getPageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= COLLAPSE_THRESHOLD) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  for (let page = 1; page <= total; page++) {
    const isEdge = page === 1 || page === total;
    const isNearCurrent = Math.abs(page - current) <= 1;
    if (isEdge || isNearCurrent) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return pages;
}

const linkClass =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border border-gray-300 px-2 text-sm font-medium text-gray-700 hover:bg-gray-100 no-underline";
const disabledClass = "pointer-events-none opacity-40";
const activeClass = "border-gray-900 bg-gray-900 text-white hover:bg-gray-900";

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <Flex align="center" justify="center" gap={2} className="mt-10">
      <Link
        href={`?page=${currentPage - 1}`}
        aria-label="Previous page"
        className={cn(linkClass, currentPage === 1 && disabledClass)}
      >
        ←
      </Link>

      {pageNumbers.map((page, index) =>
        page === "ellipsis" ? (
          <Text
            key={`ellipsis-${index}`}
            variant="body2"
            className="px-1 text-gray-400"
          >
            …
          </Text>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(linkClass, page === currentPage && activeClass)}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={`?page=${currentPage + 1}`}
        aria-label="Next page"
        className={cn(linkClass, currentPage === totalPages && disabledClass)}
      >
        →
      </Link>
    </Flex>
  );
}
