// Arquivo StartAppInfo.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home, X } from "lucide-react";
import { useState } from "react";

type StartAppInfoProps = {
  displayName: string;
};

export function StartAppInfo({ displayName }: StartAppInfoProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#151519] hover:bg-[#151519] flex items-center justify-center gap-4"
          onClick={() => setOpenModal(true)}
        >
          <Home />
          <span className="font-bold">Dashboard</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-fit bg-[#181818] border-[1px] border-[#35363C] rounded-2xl text-white"
        style={{ fontFamily: "Epilogue, sans-serif" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-[18px] font-semibold leading-5">
            Dashboard
          </DialogTitle>
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-3 right-3"
          >
            <X size={24} color="#fff" />
          </button>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-[20px] font-bold">Olá, {displayName} !</p>
          <p>
            O nosso Dashboard está passando por atualizações e em breve você irá
            poder desfrutar de um magnífico gráfico para ajudar no seu
            desempenho, enquanto não fica pronto...
          </p>
          <p>
            Tome o seu café e entre no campo de "tarefas" para iniciar os seus
            afazeres de hoje.
          </p>
          <p>
            Não esqueça de contar com a minha ajuda para eu fazer o trabalho
            grosso por você
          </p>
          <p>Ass: Seu assistente 🤖</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
