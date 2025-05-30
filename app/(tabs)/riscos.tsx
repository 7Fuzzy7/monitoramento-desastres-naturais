import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default function Riscos() {
  const { colors } = useTheme();
  const [risco, setRisco] = useState<string | null>(null);
  const [cor, setCor] = useState('#ccc');
  const [detalhes, setDetalhes] = useState<any>(null);

  useEffect(() => {
    const calcularRisco = async () => {
      const dados = await AsyncStorage.getItem('leituras');
      if (dados) {
        const leituras = JSON.parse(dados);
        const ultima = leituras[leituras.length - 1];
        const umidade = parseFloat(ultima.umidade);
        const inclinacao = parseFloat(ultima.inclinacao);
        const vento = parseFloat(ultima.clima?.wind?.speed || 0);

        setDetalhes(ultima.clima);

        if (umidade > 80 && inclinacao > 30 && vento > 5) {
          setRisco('ALTO');
          setCor('#ff4d4d');
        } else if (umidade > 60 && inclinacao > 20) {
          setRisco('MODERADO');
          setCor('#ffc107');
        } else {
          setRisco('BAIXO');
          setCor('#4caf50');
        }
      } else {
        setRisco('Sem dados');
        setCor(colors.border);
      }
    };

    calcularRisco();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: cor }]}>
      <Text style={[styles.title, { color: '#fff' }]}>Nível de Risco</Text>
      <Text style={[styles.risk, { color: '#fff' }]}>{risco}</Text>
      {detalhes && (
        <View style={styles.details}>
          <Text style={[styles.info, { color: '#fff' }]}>💨 Vento: {detalhes.wind?.speed} m/s</Text>
          <Text style={[styles.info, { color: '#fff' }]}>🌡 Temp: {detalhes.main?.temp} °C</Text>
          <Text style={[styles.info, { color: '#fff' }]}>🌤 Condição: {detalhes.weather?.[0]?.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  risk: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 24,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
});
