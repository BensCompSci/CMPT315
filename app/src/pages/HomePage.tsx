import { LoginForm } from "../features/authentication/LoginForm/LoginForm"
import { User } from "../models/User"
import { SignUpForm } from "../features/authentication/SignUpForm/SignUpForm"
import './styles/login.css'
import './styles/signup.css'


interface HomePageProps {
    displayLogin: boolean,
    displaySignUp: boolean,
    updateLoggedInUser(user: User): void
    signUpNewUser(user: User): void
}

export default function HomePage(props: HomePageProps): JSX.Element {
    return (
        <div>
            {/* Home page */}
            {props.displayLogin ? <LoginForm updateLoggedInUser={props.updateLoggedInUser} /> : <></>}
            {props.displaySignUp ? <SignUpForm signUpNewUser={props.signUpNewUser} /> : <></>} 
        </div>
    )
}