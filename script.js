let divEnem = document.querySelector('#divEnem')
let divVunesp = document.querySelector('#divVunesp')
let divFuvest = document.querySelector('#divFuvest')
let vest = document.querySelector('#vest')

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
})
