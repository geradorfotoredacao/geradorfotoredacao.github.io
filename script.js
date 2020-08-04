const divEnem = document.querySelector('#divEnem')
const divVunesp = document.querySelector('#divVunesp')
const divFuvest = document.querySelector('#divFuvest')
const vest = document.querySelector('#vest')
const coment = document.querySelector('#coment')
const bot = document.querySelector('#bot')
let vestibular = 'ENEM'
let lenghtComent = 55

coment.addEventListener("keydown", ({
    key
}) => {
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

let somar = (a, b, c, d, e) => {
    return a + b + c + d + e
}

let funCol = (a) => {
    switch (a) {
        case 0: return 0;
        case 40: return 1;
        case 80: return 2;
        case 120: return 3;
        case 160: return 4;
        case 200: return 5;
    }
}

let cortarComment = (string, n) => {
    let len = Math.floor(string.length/2)
    if (len < lenghtComent) {
        return string
    } else {
        let spa = string.indexOf(' ', len - 5)
        let coments = []
        coments[0] = string.slice(0, spa)
        coments[1] = string.slice(spa)
        return coments[`${n}`]
    }    
}

let fazerImagem = (mensagem, nota, c1, c2, c3, c4, c5) => {
    let colunasEnem = [36, 92, 160, 228, 297]
    let linhasEnem = [1022, 1086, 1150, 1212, 1273, 1337]
    let comentCoordsEnem = {
        x: 25,
        y: 445
    }
    let notaCoordsEnem = {
        x: 1220,
        y: 435
    }
    var fileName = 'enem2.png'
    var imageCaption = mensagem;
    var loadedImage;
    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, linhasEnem[`${c1}`], colunasEnem[0], 'X') //comp1
            loadedImage.print(font, linhasEnem[`${c2}`], colunasEnem[1], 'X') //comp2
            loadedImage.print(font, linhasEnem[`${c3}`], colunasEnem[2], 'X') //comp3
            loadedImage.print(font, linhasEnem[`${c4}`], colunasEnem[3], 'X') //comp4
            loadedImage.print(font, linhasEnem[`${c5}`], colunasEnem[4], 'X') //comp5
            loadedImage.print(font, notaCoordsEnem.x, notaCoordsEnem.y, nota) //nota
            return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        })
        .then(function (font) {
            if (coment.value.length < lenghtComent) {
                loadedImage.print(font, comentCoordsEnem.x, comentCoordsEnem.y, imageCaption) //comentario
                loadedImage.getBase64(Jimp.MIME_JPEG, function (err, src) {
                    var img = document.createElement("img");
                    img.setAttribute("src", src);
                    document.body.appendChild(img);
                });
            } else {
                loadedImage.print(font, comentCoordsEnem.x, comentCoordsEnem.y, cortarComment(coment.value, 0) ) //comentario
                loadedImage.print(font, comentCoordsEnem.x, comentCoordsEnem.y+30, cortarComment(coment.value, 1) ) //comentario
                loadedImage.getBase64(Jimp.MIME_JPEG, function (err, src) {
                    var img = document.createElement("img");
                    img.setAttribute("src", src);
                    document.body.appendChild(img);
                });
            }

        })
        .catch(function (err) {
            console.error(err);
        });
}

bot.onclick = () => {
    let imagem = document.querySelector('img')
    if (imagem) {
        imagem.remove()
    }
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

            if (cEnem.comp1 == null || cEnem.comp2 == null || cEnem.comp3 == null || cEnem.comp4 == null || cEnem.comp5 == null) {
                alert('[ERRO] Preencha todas as lacunas!')
                console.log(cEnem)
            } else {
               fazerImagem(coment.value, cEnem.nota, funCol(cEnem.comp1), funCol(cEnem.comp2),funCol(cEnem.comp3),funCol(cEnem.comp4),funCol(cEnem.comp5))
            }
            break
        case 'VUNESP':


            break
        case 'FUVEST':


            break
    }
}

function uncheckAll() {
    var w = document.getElementsByTagName('input');
    for (var i = 0; i < w.length; i++) {
        if (w[i].type == 'radio') {
            w[i].checked = false;
        }
    }
}

vest.addEventListener('change', (event) => {
    uncheckAll()
    event.target.value != 'ENEM' ? divEnem.style.display = 'none' : divEnem.style.display = 'block'
    event.target.value != 'VUNESP' ? divVunesp.style.display = 'none' : divVunesp.style.display = 'block'
    event.target.value != 'FUVEST' ? divFuvest.style.display = 'none' : divFuvest.style.display = 'block'

    switch (event.target.value) {
        case 'ENEM':
            vestibular = 'ENEM'
            break
        case 'VUNESP':
            vestibular = 'VUNESP'
            break
        case 'FUVEST':
            vestibular = 'FUVEST'
            break
    }
})