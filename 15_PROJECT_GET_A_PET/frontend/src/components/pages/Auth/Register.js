//Componente que criará a página Register para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html

import Input from "../../form/Input"
/*Dentro do Input colocaremos os valores que os parametros receberão*/

import styles from '../../form/Form.module.css'
import { Link } from "react-router-dom"

function Register(){
  /*Função para monitorar e alterar o estado do component*/
  function handleChange(e){

  }

  return(
    <section className={styles.form_container}>
      <h1>Cadastrar</h1>
      <form>
        <Input 
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite o seu nome'
          handleOnChange={handleChange}
        />
        <Input 
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite o seu telefone'
          handleOnChange={handleChange}
        />
        <Input 
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite o seu e-mail'
          handleOnChange={handleChange}
        />
        <Input 
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}
        />
        <Input 
          text='Confirmação de senha'
          type='password'
          name='confirmpassword'
          placeholder='Confirme a sua senha'
          handleOnChange={handleChange}
        />
        <input type='submit' value='Cadastrar' />
      </form>
      <p>
        Já tem conta? <Link to='/login'>Clique Aqui!</Link>
      </p>
    </section>
  )
}

export default Register