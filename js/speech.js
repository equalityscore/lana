const listOfReds = ['polla', 'zorra', 'poya', 'coña', 'guarra']

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();

recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = true;
let lanaActivated = false
// añadir al principio del texto la hora.
let demostracion = new Audio('./audio/demostracion.mp3');
let finaliza = new Audio('./audio/finaliza.mp3');
let despidete = new Audio('./audio/despidete.mp3');



function activateLana(){
  lanaActivated = true
}

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; i++) {
    if(event.results[i].isFinal){
      let text = event.results[i][0].transcript
      
      if(text.includes('cancela')){        
        lanaActivated = false
        finaliza.play()
        document.getElementById("text").innerHTML = '' 
        
      }
      if(text.includes('despídete')){        
        lanaActivated = false
        despidete.play()
      }
      if(lanaActivated){
        const container = document.getElementById("container")
        if (listOfReds.some(substring=>text.includes(substring))){
          text = text.replace('poya', 'polla')
          document.getElementById("text").innerHTML += `<span style="color:red">${text}</span>`
          container.scrollTop = container.scrollHeight
        }
        else{
          document.getElementById("text").innerHTML += `${text} <br>`
          container.scrollTop = container.scrollHeight
        }
      }
      if(text.includes('inicia')){        
        lanaActivated = true
        demostracion.play()
      } 

    }
	}
}
recognition.start()

