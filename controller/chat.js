const {getRandomAvatar} = require('../common/utils')

const services = require('../services/chat')

/* 
* login页面
*/
async function login(ctx, next) {
    
  await ctx.render('login')
}

/* 
* login检测
 */
async function chatLogin(ctx,next){

  const {nickName} = ctx.request.body

  const avatar = getRandomAvatar()

  ctx.cookies.set('user',JSON.stringify({ nickName,avatar }),{ maxAge:24 * 60 * 60 * 1000 })

  if(nickName){

    // await ctx.redirect('/chat')
    ctx.response.body = { status:'success'}
    
  }

}

/* 
*  chat页面
*/
async function chat(ctx,next){

  let user = ctx.cookies.get('user')

  if(user){

    user = JSON.parse(user)

    if(user.nickName){
      /*  */
      const contents = await services.getContent()

      ctx.state = {
        nickName:user.nickName,
        contents
      }

      await ctx.render('chat',ctx.state)

    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')

  }

}


/*
*  聊天输入 
 */
async function addContent(ctx,next){

  const { content } = ctx.request.body

  let user = ctx.cookies.get('user')

  let data = {status:'failed'}

  if(user){

    const { nickName,avatar } = JSON.parse(user)

    await services.addContent({nickName,avatar,content})

      // 获取最新聊天记录 
    const contents = await services.getContent()

    data = {status:'success',contents}
  }


  ctx.response.body = data
}

async function getContent(ctx,next){

  const contents = await services.getContent()

  ctx.response.body = {
    contents
  }
}

module.exports = {
  login,
  chatLogin,
  chat,
  addContent,
  getContent
}