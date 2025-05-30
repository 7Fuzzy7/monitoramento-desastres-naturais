import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type Leitura = {
  data: string;
  umidade: string;
  inclinacao: string;
  cidade?: string;
  clima?: any;
};

export default function Mitigacao() {
  const { colors } = useTheme();
  const [acoes, setAcoes] = useState<string[]>([]);
  const [icone, setIcone] = useState<'checkmark-circle' | 'warning' | 'alert-circle'>('checkmark-circle');
  const [cor, setCor] = useState('#4caf50');

  useEffect(() => {
    const definirAcoes = async () => {
      const dados = await AsyncStorage.getItem('leituras');
      if (dados) {
        const leituras: Leitura[] = JSON.parse(dados);
        const ultima = leituras[leituras.length - 1];
        const umidade = parseFloat(ultima.umidade);
        const inclinacao = parseFloat(ultima.inclinacao);
        const vento = parseFloat(ultima.clima?.wind?.speed || 0);

        if (umidade > 80 && inclinacao > 30 && vento > 5) {
          setAcoes([
            'Evacuação imediata da área de risco',
            'Acionamento de sirenes de emergência',
            'Isolamento do local com barreiras',
            'Notificação à Defesa Civil',
          ]);
          setIcone('alert-circle');
          setCor('#f44336');
        } else if (umidade > 60 && inclinacao > 20) {
          setAcoes([
            'Monitoramento contínuo da área',
            'Aviso preventivo à população',
            'Inspeção técnica do terreno',
          ]);
          setIcone('warning');
          setCor('#ffc107');
        } else {
          setAcoes([
            'Manutenção preventiva das encostas',
            'Campanhas educativas sobre riscos',
            'Revisão periódica de drenagem e solo',
          ]);
          setIcone('checkmark-circle');
          setCor('#4caf50');
        }
      }
    };

    definirAcoes();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name={icone} size={60} color={cor} />
        <Text style={[styles.title, { color: colors.text }]}>Ações de Mitigação</Text>
      </View>
      {acoes.map((acao, index) => (
        <Text key={index} style={[styles.item, { color: colors.text }]}>• {acao}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
});
