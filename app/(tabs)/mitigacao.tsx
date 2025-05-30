import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function Mitigacao() {
  const { colors } = useTheme();
  const [nivelRisco, setNivelRisco] = useState<'Alto' | 'Moderado' | 'Baixo' | null>(null);
  const [acao, setAcao] = useState('');

  const carregarMitigacao = async () => {
    const dados = await AsyncStorage.getItem('leituras');
    if (dados) {
      const leituras = JSON.parse(dados);
      const ultima = leituras[leituras.length - 1];

      if (ultima && ultima.clima) {
        const { umidade, inclinacao, clima } = ultima;
        const vento = clima.wind?.speed || 0;

        if (umidade > 80 || inclinacao > 25 || vento > 7) {
          setNivelRisco('Alto');
          setAcao('⚠️ Acionar sirenes, evacuar moradores e notificar autoridades.');
        } else if (umidade > 60 || inclinacao > 15) {
          setNivelRisco('Moderado');
          setAcao('🔎 Monitoramento contínuo e orientação preventiva à comunidade.');
        } else {
          setNivelRisco('Baixo');
          setAcao('✅ Situação estável. Manter monitoramento regular.');
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMitigacao();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ações de Mitigação</Text>
      {nivelRisco && (
        <View style={styles.card}>
          <MaterialIcons
            name={nivelRisco === 'Alto' ? 'warning' : nivelRisco === 'Moderado' ? 'error-outline' : 'check-circle'}
            size={48}
            color={nivelRisco === 'Alto' ? 'red' : nivelRisco === 'Moderado' ? 'orange' : 'green'}
          />
          <Text style={[styles.riskText, { color: colors.text }]}>Risco: {nivelRisco}</Text>
          <Text style={[styles.action, { color: colors.text }]}>{acao}</Text>
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
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  riskText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  action: {
    fontSize: 16,
    textAlign: 'center',
  },
});
