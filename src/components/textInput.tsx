import { useCallback, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
interface CustomTextInputProps extends TextInputProps {
  onSubmit: (text: string) => void;
}
const CustomTextInput = (props: CustomTextInputProps) => {
  const [text, setText] = useState(props.defaultValue || "");
  const onSubmit = useCallback(() => {
    props.onSubmit(text);
    setText("");
  }, [text]);
  return (
    <TextInput
      value={text}
      onChange={(e) => {
        setText(e.nativeEvent.text);
      }}
      onSubmitEditing={onSubmit}
      {...props}
    />
  );
};

export default CustomTextInput;
