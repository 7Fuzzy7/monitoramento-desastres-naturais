import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Dados() {
  const [umidade, setUmidade] = useState('');
  const [inclinacao, setInclinacao] = useState('');

  const salvarDados = async () => {
    if (!umidade || !inclinacao) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    const novaLeitura = {
      id: Date.now().toString(),
      umidade,
      inclinacao,
      data: new Date().toLocaleString(),
    };

    try {
      const dadosExistentes = await AsyncStorage.getItem('leituras');
      const leituras = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      leituras.push(novaLeitura);
      await AsyncStorage.setItem('leituras', JSON.stringify(leituras));
      Alert.alert('Dados salvos com sucesso!');
      setUmidade('');
      setInclinacao('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao salvar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Dados Ambientais</Text>
      <TextInput
        style={styles.input}
        placeholder="Umidade do solo (%)"
        value={umidade}
        onChangeText={setUmidade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Inclinação do terreno (°)"
        value={inclinacao}
        onChangeText={setInclinacao}
        keyboardType="numeric"
      />
      <Button title="Salvar Dados" onPress={salvarDados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
});
