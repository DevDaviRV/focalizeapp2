import { collection, doc, getDocs, query, where } from "firebase/firestore";
import {db} from '@/firebase/config';
const getUserDocument = async (userEmail: string) => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('email', '==', userEmail));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
        throw new Error('Usuário não encontrado.');
    }

    const userDoc = userSnapshot.docs[0];
    return doc(usersCollection, userDoc.id);
};


export { getUserDocument }