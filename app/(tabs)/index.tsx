import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Bem-vindo ao Monitoramento de Deslizamentos 
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>
         🌧️ 
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Use o menu abaixo para inserir dados, verificar riscos e ações de mitigação.
      </Text>
      <View style={styles.divider} />
      <Text style={[styles.note, { color: colors.text }]}>
        ✅ Totalmente offline • 🔄 Dados locais • 📡 Alertar
      </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});
