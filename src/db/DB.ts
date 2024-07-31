import { initializeApp } from "firebase/app";
import {
  CollectionReference,
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { firebaseConfig } from "../../env.prod";
import { DummyData, dummyData } from "./DummyData";
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

abstract class DataBase<T> {
  abstract add(data: T): void;
  abstract get(id): Promise<T | undefined>;
  // abstract getAll(): Promise<T[]>;
  abstract update(id, data): void;
  abstract delete(id): void;
  abstract onChange(callback: (data: T[]) => void): void;
}
class TestDB implements DataBase<DummyData> {
  data = dummyData;
  eventEmitter = new EventEmitter();
  constructor() {}
  async add(data: DummyData) {
    this.data.push({ ...data });
    this.eventEmitter.emit("dataChanged");
  }
  async get(id) {
    return this.data.find((d) => d.id === id);
  }
  async getAll() {
    return this.data;
  }
  async update(id, data: DummyData) {
    const index = this.data.findIndex((d) => d.id === id);
    this.data[index] = data;
    this.eventEmitter.emit("dataChanged");
    return data;
  }
  async delete(id) {
    const index = this.data.findIndex((d) => d.id === id);
    const deleted_data = this.data.splice(index, 1);
    this.eventEmitter.emit("dataChanged");
    return deleted_data[0];
  }
  onChange(callback: (data: DummyData[]) => void) {
    callback(this.data);
    this.eventEmitter.addListener("dataChanged", () => {
      callback(this.data);
    });
  }
}
class DB<T> implements DataBase<T> {
  private db: Firestore;
  private todo_collection: CollectionReference;
  constructor(_db: Firestore) {
    this.db = _db;
    this.todo_collection = collection(_db, "todos");
  }
  add(data: Partial<T>) {
    try {
      addDoc(this.todo_collection, { ...data, created_at: Timestamp.now() });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async get(id) {
    try {
      const docSnap = await getDoc(doc(this.todo_collection, id));
      return docSnap;
    } catch (error) {
      console.error(error);
    }
  }
  async getAll() {
    return await getDocs(this.todo_collection);
  }
  async update(id, data: Partial<T>) {
    updateDoc(doc(this.todo_collection, id), data);
  }
  delete(id) {
    deleteDoc(doc(this.todo_collection, id));
  }
  onChange(callback: (data: T[]) => void) {
    onSnapshot(this.todo_collection, (snapshot) => {
      if (snapshot.docs) {
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        callback(docs as T[]);
      }
    });
  }
}
const db = new DB<DummyData>(firestore);

export default db;
