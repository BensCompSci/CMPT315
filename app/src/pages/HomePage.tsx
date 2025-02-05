import { LoginForm } from "../features/authentication/LoginForm/LoginForm"
import { User } from "../models/User"
import './styles/login.css'


interface HomePageProps {
    displayLogin: boolean,
    updateLoggedInUser(user: User): void
}

export default function HomePage(props: HomePageProps): JSX.Element {
    return (
        <div className="text-amber-400">
            Home page
            {props.displayLogin ? <LoginForm updateLoggedInUser={props.updateLoggedInUser} /> : <></>}
        </div>
    )
}