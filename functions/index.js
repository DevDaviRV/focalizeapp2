/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { onBraipWebhook } = require("./onBraipWebhook");
const {sendDailyTasksEmail} = require("./onTaskDeadline")
module.exports = {
    onBraipWebhook,
    sendDailyTasksEmail
}