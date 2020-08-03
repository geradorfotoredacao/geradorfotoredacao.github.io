const divEnem = document.querySelector('#divEnem')
const divVunesp = document.querySelector('#divVunesp')
const divFuvest = document.querySelector('#divFuvest')
const vest = document.querySelector('#vest')
const coment = document.querySelector('#coment')
const bot = document.querySelector('#bot')
let vestibular = 'ENEM'

coment.addEventListener("keydown", ({key}) => {
    if (key === "Enter") {
        event.preventDefault();
        bot.click()
    }
})

let convertNumber = (a) => {
    if (!a) {
        return null
    } else {
        return Number(a.value)
    }
}

let somar = (a,b,c,d,e) => {
    return a + b + c + d + e
}

bot.onclick = () => {
    switch (vestibular) {
        case 'ENEM':
            let cEnem = {
                comp1: convertNumber(document.querySelector('input[name="options11"]:checked')),
                comp2: convertNumber(document.querySelector('input[name="options12"]:checked')),
                comp3: convertNumber(document.querySelector('input[name="options13"]:checked')),
                comp4: convertNumber(document.querySelector('input[name="options14"]:checked')),
                comp5: convertNumber(document.querySelector('input[name="options15"]:checked')),
                nota: {}
            }
        
            cEnem.nota = somar(cEnem.comp1, cEnem.comp2, cEnem.comp3, cEnem.comp4, cEnem.comp5)
            
            if (!cEnem.comp1||!cEnem.comp2||!cEnem.comp3||!cEnem.comp4||!cEnem.comp5) {
                alert('[ERRO] Preencha todas as lacunas!')
            } else {
                //continuar código aqui!
                alert('foi')
            }
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
