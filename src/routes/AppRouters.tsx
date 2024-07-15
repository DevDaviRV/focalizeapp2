import { SideBar } from "@/common/SideBar";
import { Chat } from "@/pages/app/chat/Chat";
import { Tasks } from "@/pages/app/tasks/Tasks";
import { Timer } from "@/pages/app/timer/Timer";
import { Route, Routes } from "react-router-dom";

export function AppRouters() {


  return (

    <div className={`flex h-screen overflow-hidden`}>
      <SideBar className="w-1/5" />
    <div className="w-4/5 h-full">
      <Routes>
        <Route path="/chats" element={<Chat />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="*" element={<Tasks />} />
      </Routes>
    </div>
    </div>
  )
}