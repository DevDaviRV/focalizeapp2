import { Button } from "@/components/ui/button";
import { ExitIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import { Logo } from "./Logo";
import { Progress } from "@/components/ui/progress";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUserXp } from "@/hooks/useUserXp";
import { Bot, FileTextIcon, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Profile } from "@/pages/app/profile/Profile";
import { StartAppInfo } from "./StartAppInfo";
import { AddUserImage } from "./AddUserImage";
import { User } from "firebase/auth";

type SideBarProps = {
  className?: string;
};

export function SideBar({ className }: SideBarProps) {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const userProps = user as User;
  const { level, levelUp, updatedXp } = useUserXp(user);
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [updatedXpCatch, setUpdatedXpCatch] = useState(
    ((updatedXp as number) / (levelUp as number)) * 100
  );

  useEffect(() => {
    setUpdatedXpCatch(((updatedXp as number) / (levelUp as number)) * 100);
  }, [updatedXp, levelUp]);

  const handleLogout = () => {
    logout();
  };

  const handleXpChange: React.FormEventHandler<HTMLDivElement> = (event) => {
    const newValue = parseFloat(
      (event.target as HTMLDivElement).getAttribute("aria-valuenow") || "0"
    );

    const newUpdatedXpCatch = (newValue / (levelUp as number)) * 100;
    setUpdatedXpCatch(newUpdatedXpCatch);
  };

  return (
    <nav className={` ${className} `}>
      <div
        style={{
          backgroundColor: "rgb(41,41,41)",
          borderColor: "rgb(41,41,41)",
        }}
        className="flex flex-col border-r-[1px] text-white h-full space-y-4"
      >
        <div className="p-5">
          <Logo size="sm" />
        </div>
        <div className="flex gap-3 p-5">
          <AddUserImage
            userProps={userProps}
            open={open}
            onOpenChange={setOpen}
          />
          <div className="flex items-start text-left justify-center gap-4">
            <div className="flex flex-col">
              <p className="font-medium">{userProps.displayName}</p>
              <p className="text-sm">Premium account</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-6">
          <StartAppInfo
            displayName={
              userProps?.displayName ? userProps?.displayName : "carregando..."
            }
          />
          <Profile
            displayName={
              userProps?.displayName ? userProps?.displayName : "carregando..."
            }
            email={userProps?.email ? userProps?.email : "carregando..."}
          />

          <div className="flex flex-col items-start justify-center gap-4">
            <p className="mx-2 px-2">
              {level} ({updatedXpCatch.toFixed(1)}%/100%)
            </p>
            <Progress
              onChange={handleXpChange}
              value={updatedXpCatch}
              className="w-[15vw] mx-4 mt-2 h-2"
            />
          </div>
        </div>

        <div>
          <h2 className="font-medium text-lg px-5 mb-2">Projetos</h2>
          <div
            key="/tasks"
            role="button"
            className={`px-5 py-1.5 flex items-center gap-3 ${
              selectedItem === "/tasks" ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              navigate("/tasks");
              setSelectedItem("/tasks");
            }}
          >
            <FileTextIcon
              size={18}
              color={selectedItem === "/tasks" ? "#9076F5" : "white"}
            />
            <p
              className={`text-md, font-bold ${
                selectedItem === "/tasks" ? "text-[#9076F5]" : "text-white"
              }   `}
            >
              Tarefas
            </p>
          </div>
          <div
            key="/chats"
            role="button"
            className={`px-5 py-1.5 flex items-center gap-3 ${
              selectedItem === "/chats" ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              navigate("/chats");
              setSelectedItem("/chats");
            }}
          >
            <Bot
              size={18}
              color={selectedItem === "/chats" ? "#9076F5" : "white"}
            />
            <p
              className={`text-md, font-bold  ${
                selectedItem === "/chats" ? "text-[#9076F5]" : "text-white"
              } `}
            >
              Assistente I.A
            </p>
          </div>

          <div
            key="/timer"
            role="button"
            className={`px-5 py-1.5 flex items-center gap-3 ${
              selectedItem === "/timer" ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              navigate("/timer");
              setSelectedItem("/timer");
            }}
          >
            <TimerIcon
              size={18}
              color={selectedItem === "/timer" ? "#9076F5" : "white"}
            />
            <p
              className={`text-md, font-bold  ${
                selectedItem === "/timer" ? "text-[#9076F5]" : "text-white"
              } `}
            >
              Timer
            </p>
          </div>
        </div>

        <div className=" flex flex-col items-start justify-center gap-2">
          <Link to="https://focalizeapp.com.br/suporte" target="_blank">
            <Button variant="ghost" className="opacity-50 py-2.5">
              <InfoCircledIcon className="w-4 h-4 mr-2" />
              Contatar Suporte
            </Button>
          </Link>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="opacity-50 py-2.5"
          >
            <ExitIcon className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
          <div className="py-3"></div>
        </div>
      </div>
    </nav>
  );
}
