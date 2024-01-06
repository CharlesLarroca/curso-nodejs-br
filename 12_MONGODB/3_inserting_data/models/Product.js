const conn = require('../db/conn')

//Com o mongoDB o model é estruturado como uma class JS
class Product {
  //Dentro do constructor inserimos os campos que serão criados para inserção de dados
  constructor(name, price, description){
    this.name = name
    this.price = price
    this.description = description
  }

  //Metodo save, onde é chamado o banco, informado a collection que será inserido o dado(mesmo que ela ainda nao exista, será criada ao inserir os ddados) e o metodo insert one com os dados em forma de BSON
  save(){
    const product = conn.db().collection('product').insertOne({
      name: this.name,
      price: this.price,
      description: this.description
    })
    return product
  }

}

module.exports = Product