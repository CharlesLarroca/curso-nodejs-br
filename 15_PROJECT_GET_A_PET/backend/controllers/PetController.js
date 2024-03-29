const Pet = require('../models/Pet')
const ObjectId = require('mongoose').Types.ObjectId

//Helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{
  static async create(req, res){
    // Informações que virão do body da req
    const {name, age, weight, color} = req.body

    //Disponibilidade por padrão será true
    const available = true

    // Upload de imagens
    const images = req.files

    // Validation
    if(!name) return res.status(422).json({ message: 'O nome é obrigatório!'})
    if(!age) return res.status(422).json({ message: 'A idade é obrigatória!'})
    if(!weight) return res.status(422).json({ message: 'O peso é obrigatório!'})
    if(!color) return res.status(422).json({ message: 'A cor é obrigatória!'})
    if(images.length === 0) return res.status(422).json({ message: 'A imagem é obrigatória!'})

    // get pet owner(resgatar os dados do dono do pet)
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Create a pet
    // Passamos todas as infos dos models, no caso images fica com um array vazio por enquanto, e inserimos o user com alguns dados
    const pet = new Pet({
      name,
      age,
      weight, 
      color, 
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      },
    })

    // Realizar um map para o filename das images que forem enviadas sejam colocadas no array de images
    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({ message: 'Dados do pet cadastrados com sucesso!', newPet })
    } catch (error) {
      res.status(500).json({ message: error})
    }
  }

  // Metodo para resgatar todos os pet para serem apresentados no front
  static async getAll(req, res){
    //Metodo find retorna todos os pets sem realizar nenhum tipo de filtro, e com o metodo sort para organizar do mais novo ao mais antigo
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({pets: pets})
  }

  static async getAllUserPets(req, res){
    // Primeiro vamos resgatar o user pelo token
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Para filtrar os pets apenas de um user vamos usar o filtro 'user._id' para localizar dentro do subdocumento(dado) o user e passar o user._id do usuario que está authenticado no postman
    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({pets})
  }

  static async getAllUserAdoptions(req, res){
    // Primeiro vamos resgatar o user pelo token
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Para filtrar os pets que um user deseja adotar o filtro 'adopter._id' para localizar dentro do subdocumento(dado) o user e passar o user._id do usuario que está authenticado no postman
    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

    res.status(200).json({pets})
  }

  static async getPetById(req, res){
    const id = req.params.id
    //Validamos se o Id passado é um id valido usando o ObjectId presente no mongoose e o metodo isvalid
    if(!ObjectId.isValid(id)) return res.status(422).json({ message: 'Este id inválido!'})

    const pet = await Pet.findOne({ _id: id })

    if(!pet) return res.status(404).json({ message: 'Pet não encontrado!'})

    res.status(200).json({pet})
  }

  static async removePetByID(req, res){
    const id = req.params.id
    //Validamos se o Id passado é um id valido usando o ObjectId presente no mongoose e o metodo isvalid
    if(!ObjectId.isValid(id)) return res.status(422).json({ message: 'Este id inválido!'})

    const pet = await Pet.findOne({ _id: id })

    if(!pet) return res.status(404).json({ message: 'Pet não encontrado!'})

    // check if logged user registered the pet

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'})

    // Metodo deleteOne para remover
    await Pet.findByIdAndDelete(id)

    res.status(200).json({ message: 'Pet removido com sucesso!' })
  }

  static async updatePet(req, res){
    const id = req.params.id

    //Validamos se o Id passado é um id valido usando o ObjectId presente no mongoose e o metodo isvalid
    if(!ObjectId.isValid(id)) return res.status(422).json({ message: 'Este id inválido!'})

    const pet = await Pet.findOne({ _id: id })

    if(!pet) return res.status(404).json({ message: 'Pet não encontrado!'})

    // check if logged user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'})

    //Capturando os dados
    const {name, age, weight, color, available} = req.body

    // Upload de imagens
    const images = req.files

    // Novo objeto
    const updateData = {}

    //Validations
    if(!name){
      res.status(422).json({ message: 'O nome é obrigatório!'})
      return
    }else{
      updateData.name = name
    }
    if(!age){
      res.status(422).json({ message: 'A idade é obrigatória!'})
      return
    }else{
      updateData.age = age
    }
    if(!weight){
      res.status(422).json({ message: 'O peso é obrigatório!'})
      return
    }else{
      updateData.weight = weight
    }
    if(!color){
      res.status(422).json({ message: 'A cor é obrigatória!'})
      return
    }else{
      updateData.color = color
    }
    if(images.length > 0){
      updateData.images = []
      images.map(image => {
        updateData.images.push(image.filename)
      })
    }

    //Metodo para realizar o update do pet
    await Pet.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: 'Pet atualizado com sucesso!' })
  }

  static async schedule(req, res){
    const id = req.params.id

    //Validamos se o Id passado é um id valido usando o ObjectId presente no mongoose e o metodo isvalid
    if(!ObjectId.isValid(id)) return res.status(422).json({ message: 'Este id inválido!'})

    const pet = await Pet.findOne({ _id: id })

    if(!pet) return res.status(404).json({ message: 'Pet não encontrado!'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() == user._id.toString()) return res.status(422).json({ message: 'Não é possivel agendar visita de pet registrado por você!'})

    // check if user already scheduled a visit
    if(pet.adopter){
      if(pet.adopter._id.equals(user._id)) return res.status(422).json({ message: 'Você já agendou uma visita!'})
    } 

    //add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({ message: `Visita agendada com sucesso! Entre em contato com ${pet.user.name} no telefone ${pet.user.phone}.` })
  }

  static async concludeAdoption(req, res){
    const id = req.params.id

    //Validamos se o Id passado é um id valido usando o ObjectId presente no mongoose e o metodo isvalid
    if(!ObjectId.isValid(id)) return res.status(422).json({ message: 'Este id inválido!'})

    const pet = await Pet.findOne({ _id: id })

    if(!pet) return res.status(404).json({ message: 'Pet não encontrado!'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'})

    pet.available = false

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({ message: `Adoção concluida com sucesso! ${pet.name} pertence ao ${pet.adopter.name}`})
  }
}

