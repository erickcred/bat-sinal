import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type BatButtonSinalProps = {
  title: string;
  onPress: () => void;
};

export const BatButtonSinal = ({ title, onPress }: BatButtonSinalProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1d1d1dff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  }
});