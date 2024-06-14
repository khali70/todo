import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { data } from "@/data/index";
import ListItem from "./ListItem";
interface DemoListProps {}

const DemoList: React.FC<DemoListProps> = (props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(info) => <ListItem {...info.item} key={info.index} />}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 80, //todo: use safe area view
  },
});

export default DemoList;
