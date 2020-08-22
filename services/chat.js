const {insertOne,find} = require('../models/chat')
const moment = require('moment')



/* 存入聊天记录 */
async function addContent(data){

  await insertOne(data)
}


/* 获取聊天记录 */

async function getContent(data){

  return await find({
    createdAt:{
      $gt:moment().subtract(1,'day').toDate(),
      $lt:moment().toDate()
    }
  })
}

module.exports = {

  addContent,
  getContent
}