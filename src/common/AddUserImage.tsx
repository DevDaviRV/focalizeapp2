import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getInitials } from "@/utils/getInitials";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { PhotoInput } from "./PhotoInput";
import { useUpdateUserPhoto } from "@/hooks/useUpdateUserPhoto";
import { Button } from "@/components/ui/button";
import { getUserDocument } from "@/utils/getUserDocument";
import { getDoc } from "firebase/firestore";

type AddUserImageProps = {
  userProps: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddUserImage({
  userProps,
  open,
  onOpenChange,
}: AddUserImageProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const { updateUserPhoto, error, loading } = useUpdateUserPhoto();
  const [userPhotoURL, setUserPhotoURL] = useState<string>("");

  // Função para buscar a foto do usuário
  const fetchUserPhoto = async () => {
    try {
      const userDocument = await getUserDocument(userProps.email as string);
      const userSnapshot = await getDoc(userDocument);
      const userData = userSnapshot.data();

      if (userData && userData.photoURL) {
        setUserPhotoURL(userData.photoURL);
      }
    } catch (error) {
      console.error("Erro ao buscar a foto do usuário:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserPhoto();
    }
  }, [open, userProps.email]);

  const handlePhotoUpload = async () => {
    if (photo) {
      try {
        await updateUserPhoto(userProps.email as string, photo);
        console.log("Foto do usuário atualizada com sucesso!");
        onOpenChange(false);
        setPhoto(null);
        fetchUserPhoto();
      } catch (error) {
        console.error("Erro ao atualizar a foto do usuário:", error);
      }
    } else {
      console.error("Nenhuma foto selecionada para fazer upload.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={userPhotoURL === "" ? "" : userPhotoURL} />
          <AvatarFallback className="bg-primary/50">
            {userProps?.displayName
              ? getInitials(userProps.displayName)
              : "Carregando..."}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent
        className="w-fit bg-[#181818] border-[1px] border-[#35363C] rounded-2xl "
        style={{ fontFamily: "Epilogue, sans-serif" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Sua foto de perfil</DialogTitle>
          <DialogDescription>
            Aqui, você conseguirá adicionar uma foto sua caso queira. Basta
            enviar um arquivo aceitável abaixo
          </DialogDescription>
        </DialogHeader>
        <PhotoInput photo={photo} setPhoto={setPhoto} />
        <Button onClick={handlePhotoUpload} disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </Button>
        {error && <p className="text-white">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
