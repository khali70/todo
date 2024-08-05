import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";
import { black_accent } from "./src/colors";
import CustomTextInput from "./src/components/textInput";
import TodoList from "@/components/todoList";
import db from "./src/db/DB";
import { useCallback } from "react";

const App = () => {
  
  const onSubmit = useCallback((text) => {
    db.add({
      title: text,
      color_tag: "default",
    });
  },[]);
  return (
    <>
      <SafeAreaView className="bg-red-300 flex-1 px-3 pt-6">
      <StatusBar style="dark" backgroundColor={black_accent} animated />
        <CustomTextInput
          className="bg-white p-3 rounded-lg border-black"
          placeholder="enter Text ..."
          onSubmit={onSubmit}
        />
       <TodoList/>
      </SafeAreaView>
    </>
  );
};

export default App;
// export { default } from "./.storybook";
