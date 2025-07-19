import { TextInput } from "react-native";

type BatInputTextProps = {
  placeholder: string;
};

export const BatInputText = ({ placeholder }: BatInputTextProps) => {
  return (
    <TextInput
      style={{
        width: "100%",
        height: 50,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 6,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16,
        color: "#000000",
      }}
      placeholder={placeholder}
    />
  );
};