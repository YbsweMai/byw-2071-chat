
let inputEle = document.getElementsByClassName('chat-input')[0]

let timer

stopTimer()

longPolling()

sorollToBottom()


inputEle.onkeydown = function(e){

/* event which属性  13为enter按键*/
  let key = e.which

  if(key === 13){

    let value = inputEle.value

    if(value){

      $.ajax({

        type:'post',
        url:'http://localhost:3000/chat/addContent',
        data:{

          content:value
        },
        success:(result)=>{
          if(result.status === 'success'){

            renderChat(result.contents)

            // 输入完毕后清空input
            inputEle.value = ''

            sorollToBottom()

          }
        }
      })
    }
  }
}


// 重新渲染聊天内容
function renderChat(contents){

  let html = ''
  contents.forEach((item)=>{

    html+= '<div class=\'chat-content-container\'>'+
              '<div class=\'chat-detail clearFix\'>'+
              '<div class=\'chat-detail-left\'>'+
              `<img src='${item.avatar}' class='chat-avatar'/>`+
              `<div class='chat-name'>${item.nickName}</div>`+
              '</div>'+
              `<div class='chat-detail-right'>${item.content}`+
              '</div></div>' +
              `<div class='chat-time'>${moment(item.createdAt).locale('zh-cn').format('YYYYMMMMDo aHH:mm:ss')}</div>`+
              '</div>'
  })
            
            // // 清空
  $('.chat-content').html('')
            
            // 重新渲染
  $('.chat-content').html(html)
}

// 长轮询问 （主动发送请求）

function longPolling(){

  timer = setInterval(()=>{

    $.ajax({

      type:'get',
      url:'http://localhost:3000/chat/getContent',
      data:{},
      success:(result)=>{

        renderChat(result.contents)
      }
    })
  },2000)
}

function stopTimer(){

  if(timer){

    clearInterval(timer)
  }
}

function sorollToBottom(){

  let ele = document.getElementsByClassName('chat-content')[0]

  // 设置页面滚动 top
  ele.scrollTop = ele.scrollHeight  
}