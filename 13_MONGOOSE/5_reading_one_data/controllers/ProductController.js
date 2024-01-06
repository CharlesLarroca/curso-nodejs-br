//Importando o model e instanciando a classe dentro do metodo
const Product = require('../models/Product')

module.exports = class ProductController {
  static async showProducts(req, res){
    //Não instacio um novo obj apenas acesso o metodo diretamente pela class
    //Metodo find para localizar e lean para formatar os objs
    const products = await Product.find().lean()

    res.render('products/all', {products})
  }

  static createProduct(req, res){
    res.render('products/create')
  }

  static async createProductPost(req, res){
    //Resgato os dados do body
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const description = req.body.description

    //Instancia um novo objeto e passo os parametros em forma de obj

    const product = new Product({name, image,price, description})

    //Chamo a função save ja existente dentro do mongoose
    await product.save()
    
    res.redirect('/products')
  }

  //Metodo para resgatar dados de um unico produto
  //FindById ja existente dentro do mongoose
  static async getProduct(req, res){
    const id = req.params.id

    const product = await Product.findById(id).lean()
    
    res.render('products/product', {product})
  }
  
  // //Metodo para deletar os dados de um unico produto
  // static async removeProduct(req, res){
  //   const id = req.params.id

  //   await Product.removeProductById(id)

  //   res.redirect('/products')
  // }

  // static async editProduct(req, res){
  //   const id = req.params.id

  //   const product = await Product.getProductById(id)

  //   res.render('products/edit', {product})
  // }

  // static async editProductPost(req, res){
  //   const id = req.body.id
  //   const name = req.body.name
  //   const image = req.body.image
  //   const price = req.body.price
  //   const description = req.body.description

  //   //Assim como no save é necessário instaciar um obj
  //   const product = await new Product(name, image, price, description)
    
  //   await product.updateProduct(id)

  //   res.redirect('/products')
  // }
}