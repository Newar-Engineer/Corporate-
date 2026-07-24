"use client";

import { ReactNode } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

export default function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  loading = false,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size={32} className="text-amber-600" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">No data found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="whitespace-nowrap px-4 py-3 text-sm text-gray-700"
                  >
                    {col.render
                      ? col.render(item)
                      : ((item as Record<string, unknown>)[col.key] as ReactNode) ?? "-"}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-start justify-between py-1.5"
              >
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {col.label}
                </span>
                <span className="text-sm text-gray-900 text-right max-w-[60%]">
                  {col.render
                    ? col.render(item)
                    : ((item as Record<string, unknown>)[col.key] as ReactNode) ?? "-"}
                </span>
              </div>
            ))}
            {(onEdit || onDelete) && (
              <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50 transition-colors text-sm font-medium"
                  >
                    <FiEdit2 size={16} className="mr-1" />
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(item)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <FiTrash2 size={16} className="mr-1" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
