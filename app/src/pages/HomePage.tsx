import { LoginForm } from "../features/authentication/LoginForm/LoginForm"
import { User } from "../models/User"
import './styles/login.css'
import './styles/signup.css'


interface HomePageProps {
    displayLogin: boolean,
    displayRegister: boolean,
    updateLoggedInUser(user: User): void
}

export default function HomePage(props: HomePageProps): JSX.Element {
    return (
        <div>
            Home page
            {props.displayLogin ? <LoginForm updateLoggedInUser={props.updateLoggedInUser} /> : <></>}
        </div>
    )
}