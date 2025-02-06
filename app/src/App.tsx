import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage'
import './App.css'
import { User } from './models/User';
import SignUpForm from './features/authentication/SignUpForm/SignUpForm';

function App() {

  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  //user undefined by default
  const [loggedInUser, setLoggedInUser] = useState<User>();
  

  const updateLoggedInUser = (user: User) => {
    setLoggedInUser(user);
    setDisplayLogin(false);
  }

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser])

  return (
    <>
      <div>
        <h1 className="text-amber-400"> HELLO! DO YOU WORK???</h1>
        <HomePage displayLogin={displayLogin} updateLoggedInUser={updateLoggedInUser} displayRegister={false}/>
        <SignUpForm/>
      </div>

    </>
  )
}

export default App
