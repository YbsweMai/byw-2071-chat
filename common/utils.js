const _ = require('lodash')

const moment = require('moment')

/* 获取随机头像 */
function getRandomAvatar(){

  const avatars = [
    'https://wx1.sbimg.cn/2020/08/22/3TEnT.jpg',
    'https://wx1.sbimg.cn/2020/08/22/3TbXw.jpg'
  ]

  let index = _.random(0,1)

  return avatars[index]
}

function formatTime(time){

  return moment(time).locale('zh-cn').format('YYYYMMMMDo aHH:mm:ss')
}

module.exports ={

  getRandomAvatar,
  formatTime
}