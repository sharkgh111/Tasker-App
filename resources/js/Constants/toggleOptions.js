import { FaPencil } from "react-icons/fa6";
import { BsArchive, BsBell } from "react-icons/bs";

export const getToggleOptions = (data) => [
   { id: "can_edit", label: "Можливість редагувати", Icon: FaPencil, value: data.can_edit },
   {
      id: "can_archive",
      label: "Можливість архівувати",
      Icon: BsArchive,
      value: data.can_archive,
   },
   { id: "has_reminder", label: "Нагадування", Icon: BsBell, value: data.has_reminder },
];
