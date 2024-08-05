
import { DummyData } from "@/db/DummyData";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import TodoItem from "../todo";
import db from "@/db/DB";

const TodoList = ()=>{
    const [Todos, setTodos] = useState<DummyData[]>([]);
    useEffect(() => {
      db.onChange(setTodos);
    }, []);
    return(
      <FlatList
      className="flex-1 mt-1"
      renderItem={({item})=><TodoItem key={item.id} {...item} />}
      keyExtractor={(item)=>item.id}
      data={Todos}
      />
    );
  }

export default TodoList