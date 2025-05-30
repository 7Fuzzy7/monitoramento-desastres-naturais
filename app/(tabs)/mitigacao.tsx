import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Mitigacao() {
  const [acoes, setAcoes] = useState<string[]>([]);
  const [icone, setIcone] = useState<'checkmark-circle' | 'warning' | 'alert-circle'>('checkmark-circle');
  const [cor, setCor] = useState('#4caf50');

  useEffect(() => {
    const definirAcoes = async () => {
      const dados = await AsyncStorage.getItem('leituras');
      if (dados) {
        const leituras = JSON.parse(dados);
        const ultima = leituras[leituras.length - 1];
        const umidade = parseFloat(ultima.umidade);
        const inclinacao = parseFloat(ultima.inclinacao);

        if (umidade > 80 && inclinacao > 30) {
          setAcoes([
            'Evacuação imediata da área de risco',
            'Acionamento de sirenes de emergência',
            'Isolamento do local com barreiras',
            'Notificação à Defesa Civil',
          ]);
          setIcone('alert-circle');
          setCor('#f44336'); // vermelho
        } else if (umidade > 60 && inclinacao > 20) {
          setAcoes([
            'Monitoramento contínuo da área',
            'Aviso preventivo à população',
            'Inspeção técnica do terreno',
          ]);
          setIcone('warning');
          setCor('#ffc107'); // amarelo
        } else {
          setAcoes([
            'Manutenção preventiva das encostas',
            'Campanhas educativas sobre riscos',
            'Revisão periódica de drenagem e solo',
          ]);
          setIcone('checkmark-circle');
          setCor('#4caf50'); // verde
        }
      }
    };

    definirAcoes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={icone} size={60} color={cor} />
        <Text style={styles.title}>Ações de Mitigação</Text>
      </View>
      {acoes.map((acao, index) => (
        <Text key={index} style={styles.item}>• {acao}</Text>
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
