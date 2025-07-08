require('dotenv').config();
const { sendEmail } = require('./src/services/emailService');

sendEmail('guilhermeviana347@gmail.com', 'Teste de envio', 'Este é um email de teste via Nodemailer')
  .then(() => console.log('✅ Email enviado com sucesso!'))
  .catch(err => console.error('❌ Erro ao enviar email:', err));
