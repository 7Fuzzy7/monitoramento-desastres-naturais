import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default function Riscos() {
  const { colors } = useTheme();
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
      <Text style={[styles.title, { color: colors.card }]}>Nível de Risco</Text>
      <Text style={[styles.risk, { color: colors.card }]}>{risco}</Text>
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
  },
  risk: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
