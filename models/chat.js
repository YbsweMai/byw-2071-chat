const {chatsModel} = require('./schema/chat')
// const { Model } = require('mongoose')

async function insertOne(data){

  const model = new chatsModel(data)

  await model.save()

}

async function find(query){

  return chatsModel.find(query).lean()
}

module.exports = {

  insertOne,
  find
}