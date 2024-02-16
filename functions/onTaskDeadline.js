/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.sendDailyTasksEmail = functions.pubsub.schedule("0 9 * * *")
  .timeZone("America/Sao_Paulo")
  .onRun(async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      replyTo: 'contato@focalizeapp.com.br',
      auth: {
        user: 'labinfoproducts@gmail.com',
        pass: 'TPbRV5cM76tE91Kr',
      },
    });

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const snapshot = await admin.firestore().collection("users").get();

      const promises = [];

      snapshot.forEach(async (doc) => {
        const data = doc.data();
        if (data.tasks && Array.isArray(data.tasks)) {
          const tasksToEmail = data.tasks.filter((task) => {
            const taskDate = new Date(task.deadline.seconds * 1000);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate.getTime() === today.getTime();
          });

          if (tasksToEmail.length > 0) {
            const mailOptions = {
              from: 'Focalize Company <contato@focalizeapp.com.br>',
              to: data.email,
              subject: 'Tarefas para Hoje',
              html: generateEmailBody(tasksToEmail),
            };

            promises.push(transporter.sendMail(mailOptions));
          }
        }
      });

      await Promise.all(promises);
      console.log("E-mails enviados com sucesso!");

      return null;
    } catch (error) {
      console.error("Erro ao processar tarefas diárias:", error);
      return null;
    }
  });

function generateEmailBody(tasks) {
  let body = "<h2>Olá, as suas tarefas para hoje são:</h2>";

  tasks.forEach((task) => {
    body += `<p><b>${task.name}</b></p>`;
    body += "<hr>";
  });

  return body;
}
