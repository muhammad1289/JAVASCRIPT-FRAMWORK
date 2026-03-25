const messageinp = document.querySelector('.chat-input')
const chatbody = document.querySelector('.chat-body')
const typerow = document.querySelector('.typing-row')
const sendbtn =  document.querySelector('.send-btn')
const fileinput = document.getElementById('file-input');
const emjbtn = document.getElementById('emoji-btn')
 
const apikey = "AIzaSyBn7316xQGbIM6SGNvU35wSHNHD-fBY3-0" 
const apiurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apikey}`


const userimp = {
     message : '',
     file : {
      mime_type : null,
      data : null
     }
}

let chathistory = [];

function handleoutgoingmessages(usermessage){
    
        const div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML =  `<div class="msg-row user">
         <div class="msg-group">
        
          ${userimp.file.data ? `<img src ='data:${userimp.file.mime_type};base64,${userimp.file.data}' class="attachment"/>` : ""}

          <div class="bubble user">${usermessage}</div>
          <span class="msg-time">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
         </div>
        </div>`
        chatbody.scrollTop = chatbody.scrollHeight; // scrolls to the bottom
        return div
}

function genratebotresponse(userinpt , div){

  chathistory.push( {
                role : 'user',
                parts : [{text : userinpt} , ...(userimp.file.data ? [{ inline_data: userimp.file}] : [] )]
            }) 

    const requesttoserver = {  // object to send to sever 
        method : 'POST' ,    //"I am sending a DATA" (not just checking)
        headers : {"content-type" : "application/json"}, // telling the server "I'm sending JSON"
        body: JSON.stringify({   //converts your JavaScript object into a text string because the internet only sends text
            contents : chathistory
        })
    }
    
    let botresult = " "; 
    fetch(apiurl , requesttoserver)  //sends the request to Google's server
        .then(Response => Response.json())  // this line opens the reponse and converts it into a JavaScript object so we can work with it
          .then(data => {
            if(!data.candidates) {
              console.log('API Error:', data);
              div.querySelector('.bubble_bot').textContent = 'Something went wrong!';
              return;
            }
            botresult = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();  // this is where we get the bot's response from the data object and save it to userimp.message
           
            const botBubble = div.querySelector('.bubble_bot');
            botBubble.textContent = botresult;
            chatbody.scrollTop = chatbody.scrollHeight; // scrolls to the bottom 
            
             chathistory.push({
                role : 'model',
                parts : [{text : botresult} ]
            })


            console.log(data);
          }).catch(error => {
                const botBubble = div.querySelector('.bubble_bot');
                botBubble.innerHTML = `<p>Error: ${error.message}</p>`;
                botBubble.style.color = 'red';
                console.log(error);    
          }).finally(() => {
                userimp.file = {};
                chatbody.scrollTo({ top : chatbody.scrollHeight , behavior : "smooth"});
          }) 
                
          

}

function chatbotdiv(){
    
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<div class="msg-row bot">
    <div class="msg-avatar">🤖</div>
    <div class="msg-group">
      <div class="bubble_bot"> 
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
        </div>
      <span class="msg-time">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
    </div>
  </div>`

  genratebotresponse(userimp.message , div);

    return div
}

//let usermessage ;

messageinp.addEventListener('keyup' ,(e) => {
     userimp.message = e.target.value.trim();


    if(e.key == 'Enter' && userimp.message){
        // handleoutgoingmessages(usermessage);
        chatbody.appendChild(handleoutgoingmessages(userimp.message));
        chatbody.appendChild(chatbotdiv());
        e.target.value = '';
        userimp.message = '';
        
        //userimp.file = { mime_type: null, data: null };

        document.getElementById('img-preview').style.display = 'none';
        document.getElementById('preview-wrap').style.display = 'none';
    }
})

fileinput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1]
      
      // store file data in userinp
      userimp.file = {
        mime_type : file.type,
        data : base64
      }
      console.log(userimp);
      fileinput.value = ''
    }
    reader.readAsDataURL(file)
   
    
})

document.getElementById('remove-img').addEventListener('click', () => {
    userimp.file = { mime_type: null, data: null };
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-wrap').style.display = 'none';
    fileinput.value = '';
});


 sendbtn.addEventListener('click', () => {
    const msg = messageinp.value.trim(); // ✅ save first
    if(!msg) return;
    chatbody.appendChild(handleoutgoingmessages(msg));
    userimp.message = msg;               // ✅ set before chatbotdiv runs
    chatbody.appendChild(chatbotdiv());  // ✅ appended properly
    userimp.message = '';                // ✅ clear after
    messageinp.value = '';
    document.getElementById('img-preview').style.display = 'none';
    document.getElementById('preview-wrap').style.display = 'none';
})

document.getElementById('file-upload').addEventListener('click', () => {
    fileinput.click();
}); 


const picker = new EmojiMart.Picker({
  theme : 'light',
  skinTonePosition : 'none',
  previewPosition : 'none',
  onEmojiSelect : (emoji) => {
    const { selectionStart : start , selectionEnd : end } = messageinp;
    messageinp.setRangeText(emoji.native, start , end, "end");
    messageinp.focus();
    
  },
  onClickOutside : (e) =>{
    if(e.target.id === "emoji-btn"){
      document.body.classList.toggle("show-emoji-picker")
    } else{
      document.body.classList.remove("show-emoji-picker")
    }
  }
})

document.querySelector('.chat-footer').appendChild(picker)



