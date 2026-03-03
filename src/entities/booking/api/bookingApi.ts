import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/shared/lib";
import type { Booking, BookingList, CreateBookingParams } from "../model/types";

const COLLECTION = "bookings";

export const bookingApi = {
  getAll: async (uid: string): Promise<BookingList> => {
    const q = query(collection(db, COLLECTION), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Booking);
  },

  getById: async (id: string): Promise<Booking> => {
    const ref = doc(db, COLLECTION, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      throw new Error(`Booking ${id} not found`);
    }
    return { id: snapshot.id, ...snapshot.data() } as Booking;
  },

  create: async (params: CreateBookingParams, uid: string): Promise<Booking> => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...params,
      userId: uid,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    const snapshot = await getDoc(docRef);
    return { id: snapshot.id, ...snapshot.data() } as Booking;
  },

  cancel: async (id: string): Promise<Booking> => {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, { status: "cancelled" });
    const snapshot = await getDoc(ref);
    return { id: snapshot.id, ...snapshot.data() } as Booking;
  },
};
