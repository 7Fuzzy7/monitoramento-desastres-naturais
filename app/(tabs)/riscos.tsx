import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Riscos() {
  const [risco, setRisco] = useState<string | null>(null);
  const [cor, setCor] = useState('#ccc');

  useEffect(() => {
    const calcularRisco = async () => {
      const dados = await AsyncStorage.getItem('leituras');
      if (dados) {
        const leituras = JSON.parse(dados);
        const ultima = leituras[leituras.length - 1];
        const umidade = parseFloat(ultima.umidade);
        const inclinacao = parseFloat(ultima.inclinacao);

        if (umidade > 80 && inclinacao > 30) {
          setRisco('ALTO');
          setCor('#ff4d4d'); // vermelho
        } else if (umidade > 60 && inclinacao > 20) {
          setRisco('MODERADO');
          setCor('#ffc107'); // amarelo
        } else {
          setRisco('BAIXO');
          setCor('#4caf50'); // verde
        }
      } else {
        setRisco('Sem dados');
        setCor('#ccc');
      }
    };

    calcularRisco();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: cor }]}>
      <Text style={styles.title}>Nível de Risco</Text>
      <Text style={styles.risk}>{risco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  risk: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
});
