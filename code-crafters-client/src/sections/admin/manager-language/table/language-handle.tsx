import { Language } from "@/interfaces";
import { Row } from "@tanstack/react-table";

interface LanguageRowActionsProps {
  row: Row<Language>;
}

export const LanguageHandle = (props: LanguageRowActionsProps) => {
  const { row } = props;
  return <div>LanguageHandle</div>
}
