import { type CSSProperties, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  View,
  Heading,
  Text,
  Flex,
  TextField,
  Badge,
} from "@adobe/react-spectrum";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
}

const USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2026-03-30",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2026-03-29",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2026-02-15",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2026-03-31",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    role: "Editor",
    status: "Pending",
    lastLogin: "2026-03-20",
  },
  {
    id: 6,
    name: "Fiona Green",
    email: "fiona@example.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "2026-03-28",
  },
  {
    id: 7,
    name: "George Harris",
    email: "george@example.com",
    role: "Editor",
    status: "Inactive",
    lastLogin: "2026-01-10",
  },
  {
    id: 8,
    name: "Hannah Lee",
    email: "hannah@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2026-03-31",
  },
  {
    id: 9,
    name: "Ivan Petrov",
    email: "ivan@example.com",
    role: "Viewer",
    status: "Pending",
    lastLogin: "2026-03-25",
  },
  {
    id: 10,
    name: "Julia Martinez",
    email: "julia@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2026-03-27",
  },
];

const columnHelper = createColumnHelper<User>();

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const tableStyles: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyles: CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "2px solid var(--spectrum-gray-300)",
  fontWeight: 600,
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
};

const tdStyles: CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--spectrum-gray-200)",
};

// ---------------------------------------------------------------------------
// Story: SortableTable
// ---------------------------------------------------------------------------

const sortableColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => {
      const role = info.getValue();
      const variant =
        role === "Admin" ? "positive" : role === "Editor" ? "info" : "neutral";
      return <Badge variant={variant}>{role}</Badge>;
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const variant =
        status === "Active"
          ? "positive"
          : status === "Inactive"
            ? "negative"
            : "neutral";
      return <Badge variant={variant}>{status}</Badge>;
    },
  }),
  columnHelper.accessor("lastLogin", {
    header: "Last Login",
    cell: (info) => info.getValue(),
  }),
];

function SortableTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: USERS,
    columns: sortableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Sortable Table</Heading>
      <Text>
        Click any column header to sort. Click again to reverse the sort order.
        TanStack Table is headless -- the rendering below uses plain HTML styled
        with CSS.
      </Text>

      <View
        marginTop="size-200"
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        UNSAFE_style={{ overflow: "hidden" }}
      >
        <table style={tableStyles}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={thStyles}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{ asc: " \u2191", desc: " \u2193" }[
                      header.column.getIsSorted() as string
                    ] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor:
                    row.index % 2 === 0
                      ? "var(--spectrum-gray-50)"
                      : "var(--spectrum-gray-100)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={tdStyles}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </View>

      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        Sorting state:{" "}
        {sorting.length > 0
          ? sorting.map((s) => `${s.id} ${s.desc ? "desc" : "asc"}`).join(", ")
          : "none"}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Story: FilterableTable
// ---------------------------------------------------------------------------

function FilterableTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: USERS,
    columns: sortableColumns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Filterable Table</Heading>
      <Text>
        Type in the search box to filter across all columns. You can also sort
        by clicking column headers.
      </Text>

      <Flex gap="size-200" marginY="size-200" wrap>
        <TextField
          label="Global filter"
          value={globalFilter}
          onChange={setGlobalFilter}
          width="size-3000"
        />
        <TextField
          label="Filter by name"
          value={table.getColumn("name")?.getFilterValue() as string}
          onChange={(value) => {
            table.getColumn("name")?.setFilterValue(value);
          }}
          width="size-3000"
        />
        <TextField
          label="Filter by role"
          value={table.getColumn("role")?.getFilterValue() as string}
          onChange={(value) => {
            table.getColumn("role")?.setFilterValue(value);
          }}
          width="size-3000"
        />
      </Flex>

      <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        UNSAFE_style={{ overflow: "hidden" }}
      >
        <table style={tableStyles}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={thStyles}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{ asc: " \u2191", desc: " \u2193" }[
                      header.column.getIsSorted() as string
                    ] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={sortableColumns.length}
                  style={{ ...tdStyles, textAlign: "center", padding: 24 }}
                >
                  <Text>No matching results.</Text>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.index % 2 === 0
                        ? "var(--spectrum-gray-50)"
                        : "var(--spectrum-gray-100)",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={tdStyles}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </View>

      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        Showing {table.getRowModel().rows.length} of {USERS.length} rows
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "TanStack/Table",
  parameters: {
    docs: {
      description: {
        component:
          "Showcases @tanstack/react-table as a headless table rendered with React Spectrum components and plain HTML. Demonstrates sorting, column filtering, and global filtering with realistic user data.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SortableTable: Story = {
  render: () => <SortableTableDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "A headless table with sortable columns. Click any column header to toggle ascending/descending sort. Uses getSortedRowModel for client-side sorting.",
      },
    },
  },
};

export const FilterableTable: Story = {
  render: () => <FilterableTableDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Combines sorting with global and per-column filtering. Uses getFilteredRowModel alongside getSortedRowModel. Filter inputs are React Spectrum TextFields.",
      },
    },
  },
};
