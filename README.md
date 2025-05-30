# 🌍 Monitoramento de Riscos de Deslizamentos

Este aplicativo tem como objetivo **monitorar e registrar dados ambientais** relevantes para a prevenção de deslizamentos de terra, como:
- Umidade do solo
- Inclinação do terreno
- Temperatura e pressão atmosférica
- Condição climática atual obtida via OpenWeather

---

## 📱 Acesse o aplicativo publicado no Expo

- 🔗 [Abrir app no Expo](https://expo.dev/accounts/pedromartins1/projects/monitoramento-deslizamentos)

- 📷 Ou escaneie o QR code abaixo com o aplicativo **Expo Go**:

![QR Code](qrcode_monitoramento_expo.png)

---

## 💡 Funcionalidades

- Captura automática da localização do usuário
- Integração com a API OpenWeather
- Armazenamento local de leituras com `AsyncStorage`
- Histórico de dados com exportação por e-mail
- Modo escuro integrado com o sistema
- Atualização automática da tela de histórico

---

## 🛠 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo SDK 53](https://docs.expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenWeather API](https://openweathermap.org/)
- `expo-router`, `expo-sharing`, `expo-mail-composer`, `@react-native-async-storage/async-storage`

---

## ▶️ Como rodar localmente

1. Clone este repositório:
```bash
git clone https://github.com/7Fuzzy7/monitoramento-desastres-naturais.git
cd monitoramento-desastres-naturais
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor Expo:
```bash
npx expo start
```

4. Use o aplicativo **Expo Go** para escanear o QR code gerado no terminal.

---

## 👤 Desenvolvedor

- Pedro Martins (pedromartins1)

---

> Projeto acadêmico para a disciplina de **Advanced Programming And Mobile Development** - FIAP 2025.
