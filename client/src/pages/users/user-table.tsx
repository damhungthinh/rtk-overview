import { FC } from "react";
import { useFindUsersQuery } from "../../redux/features/users/api";
import { useAppSelector } from "../../redux";

export const UserTable: FC = () => {
  const { filterValue = "" } = useAppSelector((state) => state.user);

  // Only run when
  const { data, isFetching, refetch } = useFindUsersQuery({ q: filterValue });

  return (
    <div className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <table className="table-auto w-full text-sm border rounded-md border-spacing-0 border-separate">
        <thead>
          <tr className="border-b dark:border-slate-600">
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8  text-slate-400 dark:text-slate-200 text-left">
              ID
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8  text-slate-400 dark:text-slate-200 text-left">
              Name
            </th>
            <th className="border-b border-r rounded-tr-md  dark:border-slate-600 font-medium p-4 pl-8  text-slate-400 dark:text-slate-200 text-left">
              Email
            </th>
          </tr>
        </thead>
        <tbody
          className={
            isFetching ? "animate-pulse" : "bg-white dark:bg-slate-800"
          }
        >
          {data?.map((it) => (
            <tr key={it.id}>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {it.id}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {it.name}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {it.email}
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
