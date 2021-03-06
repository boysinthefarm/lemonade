const { mylistHandler } = require('./mylist-handler');
const { listCommandBlock } = require('./block-kits');
const { logger } = require('./utils');
const { PostsApi } = require('./db-api');

module.exports = async (req, res) => {
  logger.log('--- request body ---', req.body);
  /* sample req.body:
    {
      pi_app_id: "A01JV09J6MT"
      channel_id: "C01KMTL9UUQ"
      channel_name: "dev"
      command: "/garage"
      is_enterprise_install: "false"
      response_url: "https://hooks.slack.com/commands/T01JY8V5675/1656868781185/qHkegJ7zRdbcBQyTGVhTLcu3"
      team_domain: "slackgaragesale"
      team_id: "T01JY8V5675"
      text: ""
      token: "xxxxxxxxxxxxxxx"
      trigger_id: "1644238199586.1644301176243.8060fa31ecbd0acd4f700636732fb728"
      user_id: "U01KMTKK9FA"
      user_name: "hyunwoo126"
    }
   */

  const { user_id: userId, team_id: teamId } = req.body;

  if (req.body.text === 'list') {
    const blocks = await listCommandBlock({ userId, teamId });

    res.send({
      "response_type": "in_channel",
      blocks,
    });

  } else if (req.body.text === 'mylist') {
    mylistHandler(req, res);
  } else {
    res.send({
      response_type: 'in_channel',
      text: 'command successful',
    });
  }
};

