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
        case 0:
            return 0;
        case 40:
            return 1;
        case 80:
            return 2;
        case 120:
            return 3;
        case 160:
            return 4;
        case 200:
            return 5;
        case 1:
            return 0;
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
    }
}

let cortarComment = (string, n) => {
    if (string.length < lenghtComent && n == 0) {
        return string
    } else if (string.length < lenghtComent && n == 1) {
        return ''
    } else {
        let spa = string.indexOf(' ', lenghtComent)
        let coments = []
        coments[0] = string.slice(0, spa)
        coments[1] = string.slice(spa)
        return coments[`${n}`]
    }
}

let fazerImagem = (mensagem, nota, c1, c2, c3, c4, c5) => {

    let varVest = (a, ret) => {
        if (vestibular == 'ENEM') {
            switch (ret) {
                case 'colunas':
                    return colunasEnem[a]
                case 'linhas':
                    return linhasEnem[a]
                case 'comentCoords':
                    return comentCoordsEnem[a]
                case 'notaCoords':
                    return notaCoordsEnem[a]
            }
        } else if (vestibular == 'VUNESP') {
            switch (ret) {
                case 'colunas':
                    return colunasVunesp[a]
                case 'linhas':
                    return linhasVunesp[a]
                case 'comentCoords':
                    return comentCoordsVunesp[a]
                case 'notaCoords':
                    return notaCoordsVunesp[a]
            }
        } else if (vestibular == 'FUVEST') {
            switch (ret) {
                case 'colunas':
                    return colunasFuvest[a]
                case 'linhas':
                    return linhasFuvest[a]
                case 'comentCoords':
                    return comentCoordsFuvest[a]
                case 'notaCoords':
                    return notaCoordsFuvest[a]
            }
        }
    }

    const colunasEnem = [36, 92, 160, 228, 297]
    const linhasEnem = [1022, 1086, 1150, 1212, 1273, 1337]
    const comentCoordsEnem = [25, 445]
    const notaCoordsEnem = [1220, 435]

    const colunasFuvest = [15, 65, 123]
    const linhasFuvest = [1026, 1090, 1150, 1215]
    const comentCoordsFuvest = [25, 225]
    const notaCoordsFuvest = [1320, 100]

    const colunasVunesp = [15, 65, 123]
    const linhasVunesp = [1026, 1090, 1150, 1215]
    const comentCoordsVunesp = [25, 225]
    const notaCoordsVunesp = [1320, 100]

    var fileName = vestibular + '.png'
    var imageCaption = mensagem;
    var loadedImage;
    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, varVest(c1, 'linhas'), varVest(0, 'colunas'), 'X') //comp1
            loadedImage.print(font, varVest(c2, 'linhas'), varVest(1, 'colunas'), 'X') //comp2
            loadedImage.print(font, varVest(c3, 'linhas'), varVest(2, 'colunas'), 'X') //comp3
            if (vestibular=='ENEM') loadedImage.print(font, varVest(c4, 'linhas'), varVest(3, 'colunas'), 'X') //comp4
            if (vestibular=='ENEM') loadedImage.print(font, varVest(c5, 'linhas'), varVest(4, 'colunas'), 'X') //comp5
            
            loadedImage.print(font, varVest(0, 'notaCoords'), varVest(1, 'notaCoords'), nota) //nota
            loadedImage.quality(10)
            return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        })
        .then(function (font) {
            if (coment.value.length < lenghtComent) {
                loadedImage.print(font, varVest(0, 'comentCoords'), varVest(1, 'comentCoords'), imageCaption) //comentario
                loadedImage.getBase64(Jimp.MIME_JPEG, function (err, src) {
                    var img = document.createElement("img");
                    img.setAttribute("src", src);
                    document.body.appendChild(img);
                    coment.value = ''
                });
            } else {
                loadedImage.print(font, varVest(0, 'comentCoords'), varVest(1, 'comentCoords'), cortarComment(coment.value, 0)) //comentario
                loadedImage.print(font, varVest(0, 'comentCoords') - 9, varVest(1, 'comentCoords') + 30, cortarComment(coment.value, 1)) //comentario
                loadedImage.getBase64(Jimp.MIME_JPEG, function (err, src) {
                    var img = document.createElement("img");
                    img.setAttribute("src", src);
                    document.body.appendChild(img);
                    coment.value = ''
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
            } else {
                fazerImagem(coment.value, cEnem.nota, funCol(cEnem.comp1), funCol(cEnem.comp2), funCol(cEnem.comp3), funCol(cEnem.comp4), funCol(cEnem.comp5))
            }
            break
        case 'VUNESP':
            let cVunesp = {
                comp1: convertNumber(document.querySelector('input[name="options21"]:checked')),
                comp2: convertNumber(document.querySelector('input[name="options22"]:checked')),
                comp3: convertNumber(document.querySelector('input[name="options23"]:checked')),
                nota: {}
            }

            cVunesp.nota = somar(cVunesp.comp1, cVunesp.comp2, cVunesp.comp3,0,0)

            if (cVunesp.comp1 == null || cVunesp.comp2 == null || cVunesp.comp3 == null) {
                alert('[ERRO] Preencha todas as lacunas!')
            } else {
                fazerImagem(coment.value, cVunesp.nota, funCol(cVunesp.comp1), funCol(cVunesp.comp2), funCol(cVunesp.comp3))
            }
            break
        case 'FUVEST':
            let cFuvest = {
                comp1: convertNumber(document.querySelector('input[name="options31"]:checked')),
                comp2: convertNumber(document.querySelector('input[name="options32"]:checked')),
                comp3: convertNumber(document.querySelector('input[name="options33"]:checked')),
                nota: {}
            }

            cFuvest.nota = somar(cFuvest.comp1, cFuvest.comp2, cFuvest.comp3,0,0)

            if (cFuvest.comp1 == null || cFuvest.comp2 == null || cFuvest.comp3 == null) {
                alert('[ERRO] Preencha todas as lacunas!')
            } else {
                fazerImagem(coment.value, cFuvest.nota, funCol(cFuvest.comp1), funCol(cFuvest.comp2), funCol(cFuvest.comp3))
            }

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

    coment.setAttribute('maxlength', lenghtComent)

    switch (event.target.value) {
        case 'ENEM':
            vestibular = 'ENEM'
            lenghtComent = 55
            coment.setAttribute('maxlength', `${lenghtComent*2}`)
            break
        case 'VUNESP':
            vestibular = 'VUNESP'
            lenghtComent = 74
            coment.setAttribute('maxlength', `${lenghtComent*2}`)
            break
        case 'FUVEST':
            vestibular = 'FUVEST'
            lenghtComent = 74
            coment.setAttribute('maxlength', `${lenghtComent*2}`)
            break
    }
})