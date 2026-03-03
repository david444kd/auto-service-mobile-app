import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/shared/lib";
import type { TimeSlot, TimeSlotList } from "../model/types";

const COLLECTION = "time_slots";

export const timeSlotApi = {
  getSlots: async (serviceId: string, date: string): Promise<TimeSlotList> => {
    const q = query(
      collection(db, COLLECTION),
      where("serviceId", "==", serviceId),
      where("date", "==", date),
      where("isAvailable", "==", true),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as TimeSlot);
  },
};
