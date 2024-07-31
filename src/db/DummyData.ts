import { Timestamp } from "firebase/firestore";
import { COLOR_TAGS } from "../colors";
export interface DummyData {
  id: string;
  title: string;
  description: string;
  color_tag: keyof typeof COLOR_TAGS;
  created_at: Timestamp;
}
export const dummyData: DummyData[] = [
  {
    id: "1",
    title: "Check out the new yoga studio",
    description: "I've been meaning to go for a while now, let's check it out",
    color_tag: "done",
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "I ran out of milk and eggs, let's pick up some at the store",
    color_tag: "doing",
  },
  {
    id: "3",
    title: "Clean the house",
    description: "It's been a while since I've cleaned, let's give it a shot",
    color_tag: "pending",
  },
  {
    id: "4",
    title: "Finish the project",
    description:
      "There's a few bugs to fix and I need to add some more features",
    color_tag: "pending",
  },
  {
    id: "5",
    title: "Go to the gym",
    description:
      "I've been wanting to go for a while now, let's make it happen",
    color_tag: "pending",
  },
  {
    id: "6",
    title: "Call mom",
    description: "I haven't talked to her in a while, let's catch up",
    color_tag: "pending",
  },
  {
    id: "7",
    title: "Learn a new language",
    description:
      "I've always wanted to learn a new language, let's give it a shot",
    color_tag: "done",
  },
  {
    id: "8",
    title: "Go for a hike",
    description: "The park is really nice today, let's go for a walk",
    color_tag: "pending",
  },
  {
    id: "9",
    title: "Finish reading the book",
    description: "I've been reading it for a while now, let's finish it up",
    color_tag: "doing",
  },
  {
    id: "10",
    title: "Buy a new phone",
    description:
      "I've been using the same phone for a while now, time for a new one",
    color_tag: "pending",
  },
];
