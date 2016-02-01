var Botkit = require('botkit')

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot()
var bot = controller.spawn({
  token: slackToken
})

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
});

controller.hears(['auth'], ['mention', 'direct_mention'], function (bot, message) {
  bot.reply(message, JSON.stringify(message));
});

controller.hears(['zoek'], ['mention', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Ik ga op zoek naar')
});
