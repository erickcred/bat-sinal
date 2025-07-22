import { StatusBar } from 'expo-status-bar';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BatButtonSinal } from './src/components/BatButtonSinal';

import batSinal from "./assets/bat_sinal.png";
import { useState } from 'react';
import { BatInputText } from './src/components/BatInputText';
import { BatInputTextArea } from './src/components/BatInputTextArea';
import { consultaCepGet } from './src/services/viaCepApi';
import isObjectValid from './src/utils/isObjectValid';

type PersonContact = {
  nome: string;
  telefone: string;
  endereco: string;
  mensagem: string;
};

export default function App() {
  const [visible, setVisible] = useState(true);
  const [personContact, setPersonContact] = useState({} as PersonContact);
  const [cep, setCep] = useState("");

  async function handleValidateForm() {
    const keys = ['nome', 'telefone', 'endereco', 'mensagem'] as const;
    let mensagemErro: string = "";

    for (const key of keys) {
      if (personContact[key] === undefined || personContact[key] === null || personContact[key] === "") {
        mensagemErro += `Preencha o campo ${key}!\n`;
      }
    }
    console.log(mensagemErro);
    
    if (mensagemErro !== "") {
      Alert.alert("Ops!", mensagemErro);
      return;
    }
    
    setVisible(true);
  }

  async function consultarCep(cep: string) {
    await consultaCepGet(cep)
      .then((response) => {
        if (isObjectValid(response)) {
          Alert.alert("Ops!", "CEP parece estar incorreto!");
          console.log(response.logradouro);
          return;
        }
        
        setPersonContact({
          ...personContact,
          endereco: `${response.logradouro}, ${response.bairro} - ${response.localidade}/${response.uf}`
      });
    })
    .catch((error) => {
      Alert.alert("Ops!", `CEP parece estar incorreto! \n${error}`);
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={[ styles.homeContainer, {display: visible ? 'flex' : 'none'}]}>
          <View>
            <Image
              source={batSinal}
              style={{
                width: 200,
                height: 170,
                alignItems: "flex-start",
              }}
              resizeMode="contain"
            />
          </View>

          <BatButtonSinal
            title="Activete bat signal"
            onPress={() => setVisible(false)}
          />
        </View>

        <View style={[ styles.formContainer, {display: visible ? 'none' : 'flex'}]}>
          <View 
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 30
            }}
          >
            <Image
              source={batSinal}
              style={{
                width: 70,
                height: 40,
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
          
          <BatInputTextArea
            placeholder="Mensagem... Observações e detalhes..."
            numberOfLines={10}
            onChangeText={(text) => setPersonContact({ ...personContact, mensagem: text })} 
            value={personContact.mensagem}
          />

          <BatButtonSinal
            title="Enviar"
            onPress={handleValidateForm}
          />
        </View>

        {/* <StatusBar style="auto" /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // width: "85%",
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
  }
});
