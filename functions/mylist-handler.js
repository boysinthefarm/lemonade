const { db, webClientBot } = require('./utils');
const { getPostBlock, myPostActionButtons } = require('./block-kits');

const getMylistBlocks = async (userId) => {
  // these two requests should be parallel
  const userInfo = await webClientBot.users.info({ user: userId });
  const posts = await db.collection('posts').where('seller', '==', userId).get();

  let blocks = [];
  posts.forEach(doc => {
    const buttons = myPostActionButtons(doc);
    blocks = blocks.concat(getPostBlock({
      ...doc.data(),
      display_name: userInfo.user.profile.display_name,
    }, buttons ? [buttons] : undefined));
  });

  return blocks;
};

const mylistHandler = async (req, res) => {
  const userId = req.body.user_id;
  const blocks = await getMylistBlocks(userId);
  res.send({
    response_type: 'in_channel',
    blocks,
  });
};

module.exports = {
  getMylistBlocks,
  mylistHandler,
};

