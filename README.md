# 📦 API Scanner – Histórico de Preços por Código de Barras

Sistema de leitura e monitoramento de preços baseado em código de barras. Ideal para consumidores, lojistas e aplicações que precisam rastrear o histórico de preços de produtos escaneados.

---

## 🔍 Funcionalidades

- 📷 Leitura de código de barras via app ou integração
- 🗃️ Armazenamento de produtos e seus preços ao longo do tempo
- 🧠 Histórico de preços por produto
- 📈 Comparativo automático de preços entre datas
- 🧾 Cadastro e autenticação de usuários
- ✉️ Confirmação de e-mail com link de verificação
- 🔐 JWT para autenticação segura de rotas

---

## ⚙️ Tecnologias

- **Node.js** + **Express** (backend)
- **Google Sheets API** (como banco de dados)
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **nodemailer** para envio de e-mails
- **dotenv** para variáveis de ambiente

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone git@github.com:GuilhermeViana20/api-scanner.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o `.env`:
   ```env
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   CONFIRM_SECRET=outra_chave_para_confirmacao
   GOOGLE_CLIENT_EMAIL=seu_email@projeto.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=ID_da_sua_planilha
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu_email@gmail.com
   SMTP_PASS=sua_senha_app
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## 🧪 Endpoints principais

| Método | Rota                          | Descrição                         |
|--------|-------------------------------|-----------------------------------|
| POST   | `/users/register`             | Cadastro de usuário               |
| GET    | `/users/confirm-email/:token` | Confirmação de e-mail via token   |
| POST   | `/users/login`                | Login com JWT                     |

---

## 🚧 TODO

- 📲 Integração com app mobile/web
- 📸 Leitor de código de barras integrado
- 📊 Painel de visualização dos históricos

---

## 🧑‍💻 Desenvolvido por

**Guilherme Viana**  
Full Stack Developer  
[github.com/GuilhermeViana20](https://github.com/GuilhermeViana20)