// Dados
const proffys = [
    {
        name: "Rafaella Coelho",
        avatar: "https://avatars2.githubusercontent.com/u/32441267?s=460&u=e120e786301cdd14f31e248a4b4f0f7a9201f23b&v=4",
        whatsapp: "31999999999",
        bio: "Entusiasta das melhores tecnologias de  Desenvolvimento Web. Apaixonada por aprender mais sobre o mundo da programação, onde assim, posso seguir em busca de contribuir com criação de projetos e ajudar milhares de pessoas.",
        subject: "Programação",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Rafaella Coelho",
        avatar: "https://avatars2.githubusercontent.com/u/32441267?s=460&u=e120e786301cdd14f31e248a4b4f0f7a9201f23b&v=4",
        whatsapp: "31999999999",
        bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir cisas em laboratórios e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]


// Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber
    return subjects[position - 1]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    // se tiver dados (data)
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        // adicionar data a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    } else {
       // se não, mostrar a página
       return res.render("give-classes.html", { subjects, weekdays})
    }   
}


//Servidor
const express = require('express')
const server = express()

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Inicio e configuração do servidor
server
// configurar arquivos estátivos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// start do servidor
.listen(5500)