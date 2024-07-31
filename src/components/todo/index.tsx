import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { COLOR_TAGS, black_accent } from "../../colors";
import db from "../../db/DB";
import { DummyData } from "../../db/DummyData";
import { formatDate } from "../../utils/date";
import CustomTextInput from "../textInput";

const TodoItem = ({ title, color_tag, id, created_at }: DummyData) => {
  const [editing, setEditing] = React.useState(false);
  const onEditSubmit = (text) => {
    db.update(id, { title: text }).then(() => {
      setEditing(false);
    });
  };
  const Title = () => {
    if (editing) {
      return <CustomTextInput defaultValue={title} onSubmit={onEditSubmit} />;
    } else {
      return <Text className="text-xl">{title}</Text>;
    }
  };
  const Delete = () => (
    <TouchableOpacity
      className="mx-1 rounded"
      onPress={() => {
        db.delete(id);
      }}
    >
      <FontAwesome6 name="trash" size={20} color="red" />
    </TouchableOpacity>
  );

  const Edit = () => (
    <TouchableOpacity
      className="mx-1 rounded"
      onPress={() => {
        setEditing(!editing);
      }}
    >
      <FontAwesome6
        name={editing ? "x" : "edit"}
        size={20}
        color={black_accent}
      />
    </TouchableOpacity>
  );
  const SelectColor = () => (
    <View className="flex-row">
      {Object.entries(COLOR_TAGS).map(([k, v], i) => (
        <TouchableOpacity
          className="rounded"
          onPress={() => {
            db.update(id, { color_tag: k as DummyData["color_tag"] });
          }}
        >
          <View
            key={id + "_" + k}
            style={{ backgroundColor: v }}
            className="w-4 h-4 rounded m-1 border border-slate-500"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <Animated.View
      className="w-full p-3 my-2 rounded-lg"
      style={{ backgroundColor: COLOR_TAGS[color_tag] }}
    >
      <Title />
      <View className="flex-row justify-between mt-2">
        <Text>{formatDate(created_at.toDate())}</Text>
        <View className="flex-row">
          <SelectColor />
          <Delete />
          <Edit />
        </View>
      </View>
    </Animated.View>
  );
};
export default TodoItem;
