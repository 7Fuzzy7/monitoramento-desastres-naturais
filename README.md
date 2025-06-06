# 📱 Monitoramento de Riscos de Deslizamentos

Aplicativo mobile desenvolvido com React Native + Expo para monitoramento de riscos de deslizamentos de terra, com foco em dados ambientais reais (como umidade, inclinação, vento e temperatura), ações de mitigação e histórico de alertas.

## 🚀 Link do Projeto no Expo

👉 [Abrir no Expo Go](https://expo.dev/accounts/pedromartins1/projects/monitoramento-deslizamentos)

## 📷 QR Code para Instalação

Escaneie com o aplicativo **Expo Go**:

<p align="center">
  <img src="qrcode_expo.png" alt="QR Code do App" width="200" />
</p>

### 🔗 Links Diretos de Atualização

- **Update details page URL:**  
  [https://expo.dev/preview/update?message=Atualiza%C3%A7%C3%A3o%20das%20telas%20de%20risco%20e%20mitiga%C3%A7%C3%A3o&updateRuntimeVersion=1.0.0&createdAt=2025-05-30T22%3A42%3A39.179Z&slug=exp&projectId=3a5317b1-f8a8-4bf1-b6c1-8cb0d97d9876&group=d7cb0337-a6fd-476e-b748-349c685ed619](https://expo.dev/preview/update?message=Atualiza%C3%A7%C3%A3o%20das%20telas%20de%20risco%20e%20mitiga%C3%A7%C3%A3o&updateRuntimeVersion=1.0.0&createdAt=2025-05-30T22%3A42%3A39.179Z&slug=exp&projectId=3a5317b1-f8a8-4bf1-b6c1-8cb0d97d9876&group=d7cb0337-a6fd-476e-b748-349c685ed619)

- **Update deep link URL:**  
  `exp+://expo-development-client/?url=https://u.expo.dev/3a5317b1-f8a8-4bf1-b6c1-8cb0d97d9876/group/d7cb0337-a6fd-476e-b748-349c685ed619`

---

## 🌍 Funcionalidades

- 📡 Coleta automática de dados reais do tempo via API OpenWeather (baseado na localização)
- 💧 Inserção de dados ambientais (umidade, inclinação, etc.)
- 🔔 Cálculo de risco automático
- 🚨 Ações de mitigação com base no risco atual
- 📊 Histórico de medições com exportação e reset
- 🌙 Suporte a modo escuro/claro

---

## 🛠 Tecnologias

- React Native + Expo SDK 53
- AsyncStorage (persistência local)
- OpenWeather API (dados climáticos)
- Expo Location (geolocalização)
- Expo Sharing e MailComposer (exportação)
- React Navigation + Tabs

---

## 🧪 Como rodar localmente

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor local:
```bash
npx expo start
```

3. Escaneie o QR code com o app **Expo Go** (iOS ou Android).

---

## 📤 Publicação com EAS Update

Após alterações no código, publique com:
```bash
npx eas update --branch preview --message "Última atualização do app"
```

---

## 🧠 Desenvolvido por
**Murilo Pomin** – RM: 99683  
**Luiz Augusto Melki** – RM: 552053  
**Pedro Martins** – RM: 98663  
---

> Projeto acadêmico para a disciplina de **Advanced Programming And Mobile Development** - FIAP 2025.

> _“Prevenir desastres salva vidas – e agora temos tecnologia ao nosso favor.”_
