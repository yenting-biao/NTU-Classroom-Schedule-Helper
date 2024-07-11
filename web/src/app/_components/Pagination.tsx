import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComp({
  page,
  total,
  courseNumPerPage,
  handleSearch,
}: {
  page: number;
  total: number;
  courseNumPerPage: number;
  handleSearch: (targetPage: number, isNewSearch: boolean) => Promise<void>;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page <= 1}
            onClick={async () => {
              await handleSearch(page - 1, false);
            }}
          />
        </PaginationItem>
        {page === Math.ceil(total / courseNumPerPage) && page - 1 > 1 && (
          <EllipsisItem />
        )}
        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationLink
              onClick={async () => {
                await handleSearch(page - 1, false);
              }}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <Select
            value={String(page)}
            onValueChange={async (value) => {
              await handleSearch(Number(value), false);
            }}
          >
            <SelectTrigger className="no-down-icon p-0 border-none outline-none">
              <PaginationLink isActive>{page}</PaginationLink>
            </SelectTrigger>
            {Math.ceil(total / courseNumPerPage) > 1 && (
              <SelectContent className="-translate-x-1/3">
                <SelectGroup>
                  {Array.from({
                    length: Math.ceil(total / courseNumPerPage),
                  }).map((_, index) => (
                    <SelectItem key={index} value={String(index + 1)}>
                      {index + 1}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            )}
          </Select>
        </PaginationItem>
        {page + 1 <= Math.ceil(total / courseNumPerPage) && (
          <PaginationItem>
            <PaginationLink
              onClick={async () => {
                await handleSearch(page + 1, false);
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page === 1 && page + 1 < Math.ceil(total / courseNumPerPage) && (
          <EllipsisItem />
        )}
        <PaginationItem>
          <PaginationNext
            disabled={page >= Math.ceil(total / courseNumPerPage)}
            onClick={async () => {
              await handleSearch(page + 1, false);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function EllipsisItem() {
  return (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  );
}
