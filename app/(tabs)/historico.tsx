import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import { useTheme } from '@react-navigation/native';

type Leitura = {
  data: string;
  umidade: string;
  inclinacao: string;
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
      .map(
        (leitura: Leitura) =>
          `📅 ${leitura.data}\n💧 Umidade: ${leitura.umidade}%\n📐 Inclinação: ${leitura.inclinacao}°\n`
      )
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

  useEffect(() => {
    carregarLeituras();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Histórico de Leituras</Text>
      {leituras.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>Nenhum dado registrado.</Text>
      ) : (
        <ScrollView style={styles.scroll}>
          {leituras.map((leitura: Leitura, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.info}>📅 {leitura.data}</Text>
              <Text style={styles.info}>💧 Umidade: {leitura.umidade}%</Text>
              <Text style={styles.info}>📐 Inclinação: {leitura.inclinacao}°</Text>
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
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
});
