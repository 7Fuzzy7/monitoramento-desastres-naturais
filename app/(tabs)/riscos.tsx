import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Riscos() {
  const { colors } = useTheme();
  const [risco, setRisco] = useState<'Alto' | 'Moderado' | 'Baixo' | null>(null);

  const calcularRisco = async () => {
    const dados = await AsyncStorage.getItem('leituras');
    if (dados) {
      const leituras = JSON.parse(dados);
      const ultima = leituras[leituras.length - 1];

      if (ultima) {
        const u = parseFloat(ultima.umidade);
        const i = parseFloat(ultima.inclinacao);

        if (u > 80 || i > 25) {
          setRisco('Alto');
        } else if (u > 60 || i > 15) {
          setRisco('Moderado');
        } else {
          setRisco('Baixo');
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      calcularRisco();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Nível de Risco Atual</Text>
      {risco && (
        <View style={styles.box}>
          <FontAwesome5
            name={risco === 'Alto' ? 'exclamation-triangle' : risco === 'Moderado' ? 'exclamation-circle' : 'check-circle'}
            size={64}
            color={risco === 'Alto' ? 'red' : risco === 'Moderado' ? 'orange' : 'green'}
          />
          <Text style={[styles.riscoTexto, { color: colors.text }]}>Risco: {risco}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  box: {
    alignItems: 'center',
    gap: 12,
  },
  riscoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
