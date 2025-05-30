import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  Alert, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useTheme } from '@react-navigation/native';

const API_KEY = 'd6461db5f83c784524d364a693007f6a';

export default function Dados() {
  const { colors } = useTheme();
  const [umidade, setUmidade] = useState('');
  const [inclinacao, setInclinacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState<any>(null);

  useEffect(() => {
    const buscarClima = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão de localização negada');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200 || !data.main) {
          throw new Error(`Erro da API: ${data.message || 'Resposta inválida'}`);
        }

        setUmidade(data.main.humidity.toString());
        setCidade(data.name || 'Desconhecida');
        setClima(data);
      } catch (error) {
        console.error('Erro ao buscar clima:', error);
        Alert.alert('Erro ao buscar dados climáticos');
      }
    };

    buscarClima();
  }, []);

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
      cidade,
      clima,
    };

    try {
      const dadosExistentes = await AsyncStorage.getItem('leituras');
      const leituras = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      leituras.push(novaLeitura);
      await AsyncStorage.setItem('leituras', JSON.stringify(leituras));
      Alert.alert('Dados salvos com sucesso!');
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
          <Text style={[styles.label, { color: colors.text }]}>Cidade: {cidade || 'Detectando...'}</Text>

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

          {clima && (
            <View style={styles.extraBox}>
              <Text style={[styles.info, { color: colors.text }]}>🌡 Temp: {clima.main.temp} °C</Text>
              <Text style={[styles.info, { color: colors.text }]}>🥵 Sensação: {clima.main.feels_like} °C</Text>
              <Text style={[styles.info, { color: colors.text }]}>🧭 Pressão: {clima.main.pressure} hPa</Text>
              <Text style={[styles.info, { color: colors.text }]}>💨 Vento: {clima.wind.speed} m/s</Text>
              <Text style={[styles.info, { color: colors.text }]}>🌫 Visibilidade: {clima.visibility} m</Text>
              <Text style={[styles.info, { color: colors.text }]}>🌤 Condição: {clima.weather[0].description}</Text>
            </View>
          )}
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
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  extraBox: {
    marginTop: 32,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
