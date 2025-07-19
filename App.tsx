import { StatusBar } from 'expo-status-bar';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BatButtonSinal } from './src/components/BatButtonSinal';

import batSinal from "./assets/bat_sinal.png";
import { useState } from 'react';
import { BatInputText } from './src/components/BatInputText';
import { BatInputTextArea } from './src/components/BatInputTextArea';
import { consultaCepGet } from './src/services/viaCepApi';

type PersonContact = {
  nome: string;
  telefone: string;
  endereco: string;
};

export default function App() {
  const [visivle, setVisible] = useState(true);
  const [personContact, setPersonContact] = useState({} as PersonContact);
  const [cep, setCep] = useState("");

  async function handleValidateForm() {
    if (!personContact.nome) {
      Alert.alert("Ops!", "Preencha o campo nome!");
      return;
    }

    if (!personContact.telefone) {
      Alert.alert("Ops!", "Preencha o campo telefone!");
      return;
    }

    if (!personContact.endereco) {
      Alert.alert("Ops!", "Preencha o campo cep!");
      return;
    }
    
    setVisible(true);
  }

  async function consultarCep(cep: string) {
    const response = await consultaCepGet(cep);
    console.log(response);
    setPersonContact({
      ...personContact,
      endereco: `${response.logradouro}, ${response.bairro} - ${response.localidade}/${response.uf}`
    });
  }

  return (
    <View style={styles.container}>

    <ScrollView horizontal={false}>
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

          <BatInputText 
            placeholder="Nome"
            onChangeText={(text) => setPersonContact({...personContact, nome: text})}
            value={personContact.nome}
          />
          <BatInputText
            placeholder="Telefone"
            keyboardType="phone-pad"
            onChangeText={(text) => setPersonContact({...personContact, telefone: text})}
            value={personContact.telefone}
          />
          <BatInputText 
            placeholder="CEP"
            isSearch={true}
            onChangeText={(text) => setCep(text)}
            actionSearch={() => consultarCep(cep)}
          />

          <Text
            style={{
              display: personContact.endereco ? 'flex' : 'none',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>📌 {personContact.endereco}</Text>
          
          <BatInputTextArea />
          <BatInputTextArea />
          <BatInputTextArea />
          <BatInputTextArea />
          <BatButtonSinal
            title="Enviar"
            onPress={handleValidateForm}
          />
        </View>
      </ScrollView>

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
    width: '100%',
    // paddingRight: 20,
    // paddingLeft: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',

  }
});
