var Botkit = require('botkit')

var authToken = undefined;

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
  authToken = message.text.split(' ')[1];

  bot.reply(message, 'Je kan aan de slag hoor!');
});

controller.hears(['zoek'], ['mention', 'direct_mention'], function (bot, message) {
  if (authToken === undefined) {
    bot.reply(message, 'Oh oh! Je moet eerst inloggen!');
  }

  var query = message.text.split(' ');
  query.shift();
  query.join(' ');

  bot.reply(message, 'Ik ga op zoek naar "' + query + '"!');
});
