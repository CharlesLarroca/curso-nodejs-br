import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/*Components*/
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

/*Pages*/
import Home from './components/pages/Home' 
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register' 
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPets from './components/pages/Pet/EditPets'
import PetDetails from './components/pages/Pet/PetDetails'

/*context*/
import { UserProvider } from './context/UserContext'

function App() {
  return (
    /*Navbar e footer são importados fora do switch de roteamento, pois nao serão alterados*/
    /* Inicia o roteamento de pagina, o switch recebe o caminho pelo route path, e dentro deles iremos inserir os components(paginas) que criamos */ 
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path = '/login'>
              <Login />
            </Route>
            <Route path = '/register'>
              <Register />
            </Route>
            <Route path = '/user/profile'>
              <Profile />
            </Route>
            <Route path = '/pet/mypets'>
              <MyPets />
            </Route>
            <Route path = '/pet/add'>
              <AddPet />
            </Route>
            <Route path = '/pet/edit/:id'>
              <EditPets />
            </Route>
            <Route path = '/pet/:id'>
              <PetDetails />
            </Route>
            <Route path = '/'>
              <Home />
            </Route>
          </Switch>
          </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
