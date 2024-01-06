const conn = require('../db/conn')

const {ObjectId} = require('mongodb')

//Com o mongoDB o model é estruturado como uma class JS
class Product {
  //Dentro do constructor inserimos os campos que serão criados para inserção de dados
  constructor(name, image, price, description){
    this.name = name
    this.image = image
    this.price = price
    this.description = description
  }

  //Metodo save, onde é chamado o banco, informado a collection que será inserido o dado(mesmo que ela ainda nao exista, será criada ao inserir os ddados) e o metodo insert one com os dados em forma de BSON
  save(){
    const product = conn.db().collection('product').insertOne({
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description
    })
    return product
  }

  //Metodo para resgatar dados e apresentar na view, usaremos o metodo static pois o mesmo não será acessado fora da classe e sim ficará executando dentro da instancia
  //Usaremos o metodo find para localizar os dados e o toArray para converter em um array
  static getProducts(){
    const products = conn.db().collection('product').find().toArray()

    return products
  }

  //Metodo para resgatar um unico dado atraves do metodo findOne e passando o paramentro de busca _id e usabdi o ObjectID
  static async getProductById(id){
    const product = await conn.db().collection('product').findOne({_id: new ObjectId(id)})
    
    return product
  }

  static async removeProductById(id){
    await conn.db().collection('product').deleteOne({_id: new ObjectId(id)})

    return
  }
}

module.exports = Product