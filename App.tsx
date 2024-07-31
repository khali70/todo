import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { black_accent } from "./src/colors";
import CustomTextInput from "./src/components/textInput";
import TodoItem from "./src/components/todo";
import db from "./src/db/DB";
import { DummyData } from "./src/db/DummyData";

const App = () => {
  const [Todos, setTodos] = useState<DummyData[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    db.onChange(setTodos);
  }, []);
  const onSubmit = (text) => {
    db.add({
      title: text,
      color_tag: "default",
    });
  };
  return (
    <>
      <StatusBar style="light" backgroundColor={black_accent} />
      <SafeAreaView className="bg-red-300 flex-1 px-3 pt-3">
        <CustomTextInput
          className="bg-white p-3 rounded-lg border-black"
          placeholder="enter Text ..."
          onChange={(e) => {
            setText(e.nativeEvent.text);
          }}
          onSubmit={onSubmit}
        />
        <ScrollView className="flex-1 mt-1">
          {Todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
