import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { ProfileCardInforms } from "./ProfileCardInforms";

export type ProfileProps = {
  displayName: string;
  email: string;
};

export function Profile({ displayName, email }: ProfileProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#151519] hover:bg-[#151519]"
          onClick={() => setOpenModal(true)}
        >
          <div className="flex items-center justify-center gap-4 ">
            <UserIcon />
            <div className="flex flex-col">
              <h1 className="text-white text-sm font-bold">Meu perfil</h1>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-fit bg-[#181818] border-[1px] border-[#35363C] rounded-2xl"
        style={{ fontFamily: "Epilogue, sans-serif" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-[18px] font-semibold leading-5 mt-2">
            Visualize seu perfil:
          </DialogTitle>
          <DialogDescription className="mt-6 text-white font-normal leading-3 ">
            Aqui, você poderá visualizar seus principais dados.
          </DialogDescription>
        </DialogHeader>
        <ProfileCardInforms displayName={displayName} email={email} />
      </DialogContent>
    </Dialog>
  );
}
