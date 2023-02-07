import { PageLayout } from "../components/PageLayout"
import { useAppState } from "../state/AppState"

export default function UserDetails(){
const {appState}=useAppState();
const {name, email, position, role} = appState;

    return(
        <PageLayout>
            <div className="user-profile">
                <p><span>Name: </span>{name}</p>
                <p><span>Email: </span>{email}</p>
                <p><span>Position: </span>{position}</p>
                <p><span>Role: </span>{role}</p>
            </div>
        </PageLayout>
    )
}
