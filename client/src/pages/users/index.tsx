import { FC, memo } from "react";
import { FilterHeader } from "./filter-header";
import { UserTable } from "./user-table";
import { UserModal } from "./user-modal";
import { useAppSelector } from "../../redux";

export const UserPage: FC = () => {
  const { modal } = useAppSelector((state) => state.user);
  return (
    <div className="min-h-full">
      <FilterHeader />
      <UserTable />
      {!!modal && <UserModal />}
    </div>
  );
};

export default UserPage;
