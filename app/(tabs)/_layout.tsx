import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007aff' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dados"
        options={{
          title: 'Inserir',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-upload" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="riscos"
        options={{
          title: 'Riscos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="mitigacao"
        options={{
          title: 'Mitigação',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
