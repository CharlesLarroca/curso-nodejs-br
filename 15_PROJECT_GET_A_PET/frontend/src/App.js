import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/*Components*/
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

/*Pages*/
import Home from './components/pages/Home' 
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register' 


function App() {
  return (
    /*Navbar e footer são importados fora do switch de roteamento, pois nao serão alterados*/
    /* Inicia o roteamento de pagina, o switch recebe o caminho pelo route path, e dentro deles iremos inserir os components(paginas) que criamos */ 
    <Router>
      <Navbar />
      <Container>
        <Switch>
          <Route path = '/login'>
            <Login />
          </Route>
          <Route path = '/register'>
            <Register />
          </Route>
          <Route path = '/'>
            <Home />
          </Route>
        </Switch>
        </Container>
      <Footer />
    </Router>
  );
}

export default App;
