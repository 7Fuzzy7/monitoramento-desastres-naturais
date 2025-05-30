import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default function Dados() {
  const { colors } = useTheme();
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Inserir Dados Ambientais</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Umidade do solo (%)"
            placeholderTextColor={colors.border}
            value={umidade}
            onChangeText={setUmidade}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Inclinação do terreno (°)"
            placeholderTextColor={colors.border}
            value={inclinacao}
            onChangeText={setInclinacao}
            keyboardType="numeric"
          />
          <Button title="Salvar Dados" onPress={salvarDados} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
});
