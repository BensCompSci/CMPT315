import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage'
import './App.css'
import { User } from './models/User';
// import { SignUpForm } from './features/authentication/SignUpForm/SignUpForm';

function App() {

  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  //user undefined by default
  const [loggedInUser, setLoggedInUser] = useState<User>();
  

  const[displaySignUp, setDisplaySignUp] = useState<boolean>(true);
  const [signedUpUser, setSignedUpUser] = useState<User>();
  

  const updateLoggedInUser = (user: User) => {
    setLoggedInUser(user);
    setDisplayLogin(false);
  }
  const signUpNewUser = (user:User)=> {
    setSignedUpUser(user);
    setDisplaySignUp(false);
  }

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser])

  useEffect(() => {
    console.log(signedUpUser);
  }, [signedUpUser])
  
  return (
    <>
      <div>

        {/* <h1 className="text-amber-400"> HELLO! DO YOU WORK???</h1> */}

        <HomePage displayLogin={displayLogin} updateLoggedInUser={updateLoggedInUser} signUpNewUser={signUpNewUser} displaySignUp={displaySignUp}
        
        />
        {/* <SignUpForm/> */}
        </div>
      {/* <div>
        <HomePage displaySignUp={displaySignUp} updateSignUpUser={updateSignUpUser} displaySignUp={true}/>
      </div> */}


    </>
  )
}

export default App
