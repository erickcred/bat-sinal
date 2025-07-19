import { InputModeOptions, KeyboardTypeOptions, Pressable, Text, TextInput, View } from "react-native";

type BatInputTextProps = {
  placeholder: string;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  value?: any;
  isSearch?: boolean;
  actionSearch?: () => void;
};

export const BatInputText = ({
  placeholder,
  inputMode,
  keyboardType,
  onChangeText,
  value,
  isSearch,
  actionSearch
}: BatInputTextProps) => {
  return (
    <View style={{ width: "100%", position: "relative" }}>
      <Pressable 
        style={{
          display: isSearch ? "flex" : "none",
          position: "absolute",
          top: 3,
          right: 2,
          backgroundColor: "#e3e3e3",
          borderRadius: 6,
          padding: 4.5,
          zIndex: 1,
        }}
        onPress={actionSearch}
      >
        <Text style={{
          fontSize: 26,
        }}>🔎</Text>
      </Pressable>

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
        inputMode={inputMode}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};