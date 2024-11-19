import { useEffect, useState } from "react";
import { fetchUsers } from "./ApiService";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { BiMailSend, BiSearch, BiUser } from "react-icons/bi";
import { LuArrowUpDown } from "react-icons/lu";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <BiUser className="mr-2" size={16} /> ID
      </span>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  }),

  columnHelper.accessor("name", {
    cell: (info) => {
      return (
        <Link
          to={`/userDetail/${info.row.original.id}`}
          className="text-blue-600 hover:underline"
        >
          {info.getValue()}
        </Link>
      );
    },
    header: () => (
      <span className="flex items-center">
        <BiUser className="mr-2" size={16} /> Name
      </span>
    ),
    enableSorting: true,
  }),

  columnHelper.accessor("email", {
    cell: (info) => (
      <span className="italic text-blue-600">{info.getValue()}</span>
    ),
    header: () => (
      <span className="flex items-center">
        <BiMailSend className="mr-2" size={16} /> Email
      </span>
    ),
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("address", {
    cell: (info) => {
      const { street, city } = info.getValue() || {};
      return (
        <span>
          {street}, {city}
        </span>
      );
    },
    header: () => (
      <span className="flex items-center">
        <BiUser className="mr-2" size={16} /> Address
      </span>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  }),
];
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        // console.log("Users======", usersData);
      } catch (error) {
        console.error("Failed to load", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <div className="grid place-content-center ">loading...</div>;
  }
  if (error) {
    return <div className="">{error}</div>;
  }
  if (users.length === 0) {
    return <h1 className="text-3xl font-bold underline">Loading...</h1>;
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-9 ">
        <div className="mb-4 relative">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search...."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className=" bg-hoverBlue px-6 py-4 text-left text-sm font-semibold text-White uppercase tracking-wider select-none"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer flex items-center justify-between"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === "asc" ? (
                              <LuArrowUpDown
                                className="text-White rotate-180"
                                size={16}
                              />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <LuArrowUpDown className="text-White" size={16} />
                            ) : (
                              <LuArrowUpDown className="text-White" size={16} />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() =>
                  table.setPageIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={!table.getCanPreviousPage()}
              >
                <CgChevronLeft size={20} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() =>
                  table.setPageIndex((prev) =>
                    Math.min(prev + 1, table.getPageCount() - 1)
                  )
                }
                disabled={!table.getCanNextPage()}
              >
                <CgChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
