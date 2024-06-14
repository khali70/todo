import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { main } from "./BLE/Meta";

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
          {description.slice(0, 60)}...
        </Text>
        <View style={styles.bodyTags}>
          <View style={{ width: 40 }}></View>
          {tags.map((t, i) => (
            <Text style={styles.bodyTag} key={i} onPress={() => main()}>
              {t}
            </Text>
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
    resizeMode: "cover",
    // backgroundColor: "gray",
    marginRight: 16,
    borderRadius: 8,
  },
  body: {
    flex: 2,
  },
  bodyTitle: {},
  bodyDescription: {
    marginTop: 4,
  },
  bodyTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  bodyTag: {
    marginHorizontal: 4,
    marginVertical: 2,
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
    height: 125,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flexDirection: "row",
  },
});
export default ListItem;
