import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ListItemProps extends Exercise {}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  imageUrl,
  tags,
}) => {
  return (
    <View style={styles.container}>
      <Image src={imageUrl} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>{title}</Text>
        <Text style={styles.bodyDescription}>
          {description.slice(0, 90)}...
        </Text>
        <View style={styles.bodyTags}>
          <View style={{ width: 40 }}></View>
          {tags.map((t) => (
            <Text style={styles.bodyTag}>{t}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  body: {
    flex: 3,
  },
  bodyTitle: {},
  bodyDescription: {
    marginTop: 4,
  },
  bodyTags: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bodyTag: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "red",
    paddingHorizontal: 6,
    backgroundColor: "#ff000033",
    color: "red",
  },
  container: {
    backgroundColor: "#eee",
    padding: 8,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flexDirection: "row",
  },
});
export default ListItem;
