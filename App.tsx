import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { BatButtonSinal } from './src/components/BatButtonSinal';

import batSinal from "./assets/bat_sinal.png";
import { useState } from 'react';
import { BatInputText } from './src/components/BatInputText';
import { BatInputTextArea } from './src/components/BatInputTextArea';

export default function App() {
  const [visivle, setVisible] = useState(true);

  return (
    <View style={styles.container}>

      <View style={[ styles.homeContainer, {display: visivle ? 'flex' : 'none'}]}>
        <Image
          source={batSinal}
          style={{
            width: 200,
            height: 170,
            alignItems: "flex-start",
          }}
          resizeMode="contain"
        />

        <BatButtonSinal
          title="Activete bat signal"
          onPress={() => setVisible(false)}
        />
      </View>


      <View style={[styles.formContainer, {display: visivle ? 'none' : 'flex'}]}>
        <View 
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 20,
          }}
        >
          <Image
            source={batSinal}
            style={{
              width: 90,
              height: 60,
              alignItems: "flex-start",
            }}
            resizeMode="contain"
          />
        </View>


        <BatInputText placeholder="Text" />
        <BatInputText placeholder="Text" />
        <BatInputTextArea />
        <BatInputTextArea />
        <BatButtonSinal
          title="Enviar"
          onPress={() => setVisible(!visivle)}
        />

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '80%',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '80%',
  }
});
