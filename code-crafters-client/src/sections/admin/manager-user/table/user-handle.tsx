import { User } from "@/interfaces";
import { Row } from "@tanstack/react-table";

interface UserRowActionsProps  {
    row: Row<User>;
  }


export const UserHandle = (props: UserRowActionsProps) => {
  const { row } = props;
  return <div>UserHandle</div>
}