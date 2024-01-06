//Importando o model e instanciando a classe dentro do metodo
const Product = require('../models/Product')

module.exports = class ProductController {
  static showProducts(req, res){
    res.render('products/all')
  }

  static createProduct(req, res){
    res.render('products/create')
  }

  static async createProductPost(req, res){
    //Resgato os dados do body
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description

    //Instancia um novo objeto e passo os parametros necessário que definimos no construtor
    const product = await new Product(name, price, description)

    //Chamo a função de salvar no banco
    product.save()
    
    res.redirect('/products')
  }
}