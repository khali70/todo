import React from "react";
import TodoItem from "./index";

export default {
  title: "TodoItem",
  component: TodoItem,
};

const Template = (args) => <TodoItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Default Task",
  color_tag: "red",
  id: "1",
  created_at: new Date(),
};

export const Editing = Template.bind({});
Editing.args = {
  title: "Editing Task",
  color_tag: "blue",
  id: "2",
  created_at: new Date(),
};

export const DifferentColor = Template.bind({});
DifferentColor.args = {
  title: "Different Color Task",
  color_tag: "green",
  id: "3",
  created_at: new Date(),
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  title:
    "This is a very long title to check how it handles overflow in the TodoItem component",
  color_tag: "yellow",
  id: "4",
  created_at: new Date(),
};
