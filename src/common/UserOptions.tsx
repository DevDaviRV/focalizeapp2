import { PersonIcon, FileTextIcon } from "@radix-ui/react-icons";

import { LabelSvg } from "@/common/LabelSvg";
import { Bot } from "lucide-react";

const userOptions = [
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon />,
  },
];

const projectOptions = [
  {
    route: "/tasks",
    name: "Tarefas",
    icon: <FileTextIcon />,
  },
  {
    route: "/chats",
    name: "Assistente I.A",
    icon: <Bot size={18} />,
  },
];

const labelOptions = [
  {
    value: "high",
    name: "Alta Prioridade",
    icon: <LabelSvg color="#f00" />,
  },
  {
    value: "medium",
    name: "Média Prioridade",
    icon: <LabelSvg color="orange" />,
  },
  {
    name: "Baixa Prioridade",
    icon: <LabelSvg color="#f7d372" />,
    value: "low",
  },
  {
    name: "Em Standby",
    icon: <LabelSvg color="#5abb54" />,
    value: "standby",
  },
];

export { userOptions, projectOptions, labelOptions };
