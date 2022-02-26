//Usa o mergeParams para herdar os parametros do roteador a um nivel superior
const router = require('express').Router({ mergeParams: true })
const TabelaProduto = require('./TabelaProduto')
const Produto = require('./Produto')

router.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.fornecedor.id)
    res.send(JSON.stringify(produtos))
})

router.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const body = req.body
        const dados = {...body,...{ fornecedor: idFornecedor }}
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(JSON.stringify(produto))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id
    }
    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})

router.get('/:id', async (req, res, next) => {
    try {    
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        const produto = new Produto(dados)
        await produto.carregar()
        res.status(200)
        res.send(JSON.stringify(produto))
    } catch (error) {
        next(error)
    }
})

module.exports = router