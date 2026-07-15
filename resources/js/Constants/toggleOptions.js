import { FaPencil } from "react-icons/fa6";
import { BsBell } from "react-icons/bs";

export const getToggleOptions = (data) => [
     { id: "can_edit", label: "Можливість редагувати", Icon: FaPencil, value: data.can_edit },
     { id: "has_reminder", label: "Нагадування", Icon: BsBell, value: data.has_reminder },
];
