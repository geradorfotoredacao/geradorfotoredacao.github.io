const divEnem = document.querySelector('#divEnem')
const divVunesp = document.querySelector('#divVunesp')
const divFuvest = document.querySelector('#divFuvest')
const vest = document.querySelector('#vest')
const coment = document.querySelector('#coment')
const bot = document.querySelector('#bot')
let imagem
let cEnem = {
    comp1: {},
    comp2: {},
    comp3: {},
    comp4: {},
    comp5: {}
}

coment.addEventListener("keydown", ({key}) => {
    if (key === "Enter") {
        event.preventDefault();
        bot.click()
    }
})

bot.onclick = () => {
    switch (vestibular) {
        case 'ENEM':


        break
        case 'VUNESP':


        break
        case 'FUVEST':


        break
    }
}

function uncheckAll(){ 
    var w = document.getElementsByTagName('input'); 
    for(var i = 0; i < w.length; i++){ 
      if(w[i].type=='radio'){ 
        w[i].checked = false; 
      }
    }
}

vest.addEventListener ('change', (event) => {
    uncheckAll()
    event.target.value != 'ENEM' ? divEnem.style.display = 'none' : divEnem.style.display = 'block'
    event.target.value != 'VUNESP' ? divVunesp.style.display = 'none' : divVunesp.style.display = 'block'
    event.target.value != 'FUVEST' ? divFuvest.style.display = 'none' : divFuvest.style.display = 'block'

    switch (event.target.value) {
        case 'ENEM': vestibular = 'ENEM'
        break
        case 'VUNESP': vestibular = 'VUNESP'
        break
        case 'FUVEST': vestibular = 'FUVEST'
        break
    }
})
