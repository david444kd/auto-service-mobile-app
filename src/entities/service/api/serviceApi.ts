import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/shared/lib";
import type { Service, ServiceList } from "../model/types";

const COLLECTION = "services";

export const serviceApi = {
  getAll: async (): Promise<ServiceList> => {
    const q = query(collection(db, COLLECTION), where("isActive", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
  },

  getById: async (id: string): Promise<Service> => {
    const ref = doc(db, COLLECTION, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      throw new Error(`Service ${id} not found`);
    }
    return { id: snapshot.id, ...snapshot.data() } as Service;
  },
};
