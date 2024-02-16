import { getDoc, updateDoc } from 'firebase/firestore';
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { getUserDocument } from "@/utils/getUserDocument"; 
import { getDownloadURL, ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage } from '@/firebase/config';

export function useUpdateUserPhoto() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateUserPhoto = async (userEmail: string, photo) => {
    setLoading(true);
    setError(null);
    try {
      const userDocRef = await getUserDocument(userEmail);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.data();
      
      if (!userData) {
        throw new Error("Documento do usuário não encontrado.");
      }

      const storageRef = ref(storage, `userPhotos/${userEmail}/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo.buffer);

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          setError("Erro ao fazer upload da foto do usuário: " + error.message);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(userDocRef, {
            photoURL: downloadURL
          });
          setLoading(false);
        }
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Erro ao adicionar a photo do usuário.");
      }
      setLoading(false);
    }
  };

  return { updateUserPhoto, loading, error };
}
