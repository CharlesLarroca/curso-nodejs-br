//Importando o model e instanciando a classe dentro do metodo
const Product = require('../models/Product')

module.exports = class ProductController {
  static async showProducts(req, res){
    //Não instacio um novo obj apenas acesso o metodo diretamente pela class
    const products = await Product.getProducts()

    res.render('products/all', {products})
  }

  static createProduct(req, res){
    res.render('products/create')
  }

  static createProductPost(req, res){
    //Resgato os dados do body
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const description = req.body.description

    //Instancia um novo objeto e passo os parametros necessário que definimos no construtor
    const product = new Product(name, image,price, description)

    //Chamo a função de salvar no banco
    product.save()
    
    res.redirect('/products')
  }

  //Metodo para resgatar dados de um unico produto
  static async getProduct(req, res){
    const id = req.params.id

    const product = await Product.getProductById(id)
    
    res.render('products/product', {product})
  }
  
  //Metodo para deletar os dados de um unico produto
  static async removeProduct(req, res){
    const id = req.params.id

    await Product.removeProductById(id)

    res.redirect('/products')
  }
}