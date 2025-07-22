import { TextInput } from "react-native";

type BatInputTextAreaProps = {
  placeholder?: string;
  numberOfLines?: number;
  onChangeText?: (text: string) => void;
  value?: any,
};

export const BatInputTextArea = ({ 
  placeholder,
  numberOfLines,
  onChangeText,
  value
}: BatInputTextAreaProps) => {
  return (
    <TextInput
    style={{
        width: "100%",
        height: 250,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 6,
        paddingLeft: 15,
        paddingRight: 15,
        textAlignVertical: "top",
        fontSize: 16,
        color: "#000000",
      }}
      inputMode="text"
      keyboardType="default"
      placeholder={placeholder ?? "Texo aqui..."}
      multiline
      numberOfLines={numberOfLines ?? 11}
      onChangeText={onChangeText}
      value={value}
    />
  );
};