import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import { useTheme, useFocusEffect } from '@react-navigation/native';

type Leitura = {
  id: string;
  data: string;
  umidade: string;
  inclinacao: string;
  cidade?: string;
  clima?: any;
};

export default function Historico() {
  const { colors } = useTheme();
  const [leituras, setLeituras] = useState<Leitura[]>([]);

  const carregarLeituras = async () => {
    const dados = await AsyncStorage.getItem('leituras');
    if (dados) {
      setLeituras(JSON.parse(dados));
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarLeituras();
    }, [])
  );

  useEffect(() => {
    const intervalo = setInterval(() => {
      carregarLeituras();
    }, 10000); // atualiza a cada 10 segundos

    return () => clearInterval(intervalo);
  }, []);

  const resetarLeituras = async () => {
    await AsyncStorage.removeItem('leituras');
    setLeituras([]);
    Alert.alert('Histórico apagado com sucesso!');
  };

  const exportarLeituras = async () => {
    const dados = await AsyncStorage.getItem('leituras');
    if (!dados) {
      Alert.alert('Nenhum dado para exportar.');
      return;
    }

    const leituras: Leitura[] = JSON.parse(dados);

    const texto = leituras
      .map((leitura) => {
        return `📅 ${leitura.data}\n🏙️ Cidade: ${leitura.cidade || 'N/A'}\n💧 Umidade: ${leitura.umidade}%\n📐 Inclinação: ${leitura.inclinacao}°\n🌡 Temp: ${leitura.clima?.main?.temp || 'N/A'} °C\n🥵 Sensação: ${leitura.clima?.main?.feels_like || 'N/A'} °C\n🧭 Pressão: ${leitura.clima?.main?.pressure || 'N/A'} hPa\n💨 Vento: ${leitura.clima?.wind?.speed || 'N/A'} m/s\n🌫 Visibilidade: ${leitura.clima?.visibility || 'N/A'} m\n🌤 Condição: ${leitura.clima?.weather?.[0]?.description || 'N/A'}\n`;
      })
      .join('\n');

    const fileUri = FileSystem.documentDirectory + 'leituras.txt';
    await FileSystem.writeAsStringAsync(fileUri, texto, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: [],
        subject: 'Exportação de Leituras – Monitoramento de Deslizamentos',
        body: 'Segue em anexo o arquivo de texto com os dados registrados.',
        attachments: [fileUri],
      });
    } else if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Exportação indisponível neste dispositivo.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Histórico de Leituras</Text>
      {leituras.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>Nenhum dado registrado.</Text>
      ) : (
        <ScrollView style={styles.scroll}>
          {leituras.map((leitura, index) => (
            <View key={leitura.id || index.toString()} style={styles.card}>
              <Text style={styles.info}>📅 {leitura.data}</Text>
              <Text style={styles.info}>🏙️ Cidade: {leitura.cidade || 'Desconhecida'}</Text>
              <Text style={styles.info}>💧 Umidade: {leitura.umidade}%</Text>
              <Text style={styles.info}>📐 Inclinação: {leitura.inclinacao}°</Text>
              {leitura.clima && (
                <>
                  <Text style={styles.info}>🌡 Temp: {leitura.clima.main.temp} °C</Text>
                  <Text style={styles.info}>🥵 Sensação: {leitura.clima.main.feels_like} °C</Text>
                  <Text style={styles.info}>🧭 Pressão: {leitura.clima.main.pressure} hPa</Text>
                  <Text style={styles.info}>💨 Vento: {leitura.clima.wind.speed} m/s</Text>
                  <Text style={styles.info}>🌫 Visibilidade: {leitura.clima.visibility} m</Text>
                  <Text style={styles.info}>🌤 Condição: {leitura.clima.weather[0].description}</Text>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      )}
      <Button title="Resetar Histórico" onPress={resetarLeituras} color="#f44336" />
      <View style={{ height: 12 }} />
      <Button title="Exportar por E-mail" onPress={exportarLeituras} color="#2196f3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scroll: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
});
