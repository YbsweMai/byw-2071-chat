let inputEle = document.getElementsByClassName('login-input')[0]
let btnEle = document.getElementsByClassName('login-button')[0]

btnEle.onclick = function(){

  let nickName = inputEle.value

  if(nickName){

    $.ajax({

      type:'post',
      url:'http://localhost:3000/chat/login',
      data:{

        nickName
      },
      success:(result)=>{
        if(result.status === 'success'){

          location.href ='chat'
        }
      },
      error:()=>{
            
      }
    })
  }
}