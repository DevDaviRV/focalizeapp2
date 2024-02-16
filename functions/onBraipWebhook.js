/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const { Resend } = require("resend");
const express = require("express");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateRandomPassword() {
  const chars = "abcdefgbhijklmnopqrstuvwxyzABCDEFGHYJKLMNIPQRSWXYZ1234567890";
  let x = 0;
  let password = "";
  while (x < 8) {
    const random = Math.floor(Math.random() * (chars.length - 1));
    password += chars[random];
    x++;
  }

  return password;
}

app.post("/", async (req, res) => {
  const webhook = req.body;

  if (Object.keys(webhook).length === 0) {
    return res.status(400).send("O objeto de webhook não deve estar vazio.");
  }

  try {
    const db = admin.firestore();
    const auth = admin.auth();

    if (webhook.type === "ASSINATURA_ALTERADA") {
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(webhook.client_email);
      } catch (error) {
        console.log("Usuário não encontrado, criando novo usuário.");
      }

      if (!userRecord) {
        const password = generateRandomPassword();

        userRecord = await auth.createUser({
          email: webhook.client_email,
          emailVerified: true,
          displayName: webhook.client_name,
          password,
          disabled: false,
        });

        await db
          .collection("users")
          .doc(userRecord.uid)
          .set(
            {
              email: webhook.client_email,
              name: webhook.client_name,
              phone: webhook.client_cel,
              isActive: true,
              online: true,
              id: userRecord.id,
              tasks: [],
              level: {
                levelUp: 200,
                name: "Starter",
                xp: 0,
              },
              origin: "https://pay.hotmart.com",
            },
            { merge: true }
          );

        const subscription = {
          status: webhook.subs_status,
          plan: webhook.plan_name,
          price: webhook.plan_amount,
          purchaseDate: new Date(webhook.subs_createdate),
          statusDate: new Date(webhook.subs_createdate),
          ownerId: userRecord.uid,
          ownerEmail: webhook.client_email,
        };

        await db
          .collection("subscriptions")
          .doc(userRecord.uid)
          .set(subscription, { merge: true });

        // Enviar e-mail de confirmação usando Resend
        const resend = new Resend("re_9DF2DKpp_Gaw7ZLMj1dyZL7Bx1au3tsrh");
        resend.emails.send({
          from: "contato@focalizeapp.com.br",
          to: webhook.client_email,
          subject: "Você acabou de comprar o focalize!",
          html: `
            <p>Sua compra foi aprovada com sucesso! Obrigado por escolher nosso serviço.</p>
            <p>Sua senha de acesso: <b>${password}</b></p>
          `,
        });

        return res
          .status(200)
          .send("Usuário criado com sucesso. E-mail de confirmação enviado.");
      }

      const userId = userRecord.uid;

      const subscription = {
        status: webhook.subs_status,
        plan: webhook.plan_name,
        price: webhook.plan_amount,
        purchaseDate: new Date(webhook.subs_createdate),
        statusDate: new Date(webhook.subs_createdate),
        ownerId: userId,
        ownerEmail: webhook.client_email,
      };

      await db
        .collection("subscriptions")
        .doc(userId)
        .set(subscription, { merge: true });

      // Enviar e-mail de confirmação usando Resend
      const resend = new Resend("re_9DF2DKpp_Gaw7ZLMj1dyZL7Bx1au3tsrh");
      resend.emails.send({
        from: "contato@focalizeapp.com.br",
        to: webhook.client_email,
        subject: "Compra Aprovada - Confirmação",
        html: `
          <p>Sua compra foi aprovada com sucesso! Obrigado por escolher nosso serviço.</p>
        `,
      });

      return res
        .status(200)
        .send("Compra aprovada. E-mail de confirmação enviado.");
    }
  } catch (error) {
    console.log(`Erro ao processar o webhook com o ID: ${webhook.id} `, error);
    return res.status(500).send("Erro interno ao processar o webhook.");
  }
});

exports.onBraipWebhook = functions.https.onRequest(app);
