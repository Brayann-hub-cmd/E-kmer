import { useEffect, useState } from "react";
import api from "./api"
function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading ] = useState(true)
    useEffect(() => {
        async function login(email, password) {
            try {
                const response = await api.post('auth/login/', { email: email, password: password });
                localStorage.setItem('token', response.data.token)
                setUser(response.data.user)
            } catch (error) {
                console.log('Erreur: ', error.response.data);

            } finally {
                setLoading(false)
            }

        }
        login("brayann@gmail.com","1234")
    }, [])

    if(loading){
        return <div>Chargement ..........</div>
    }

    if(!user){
        return <div>pas d'user</div>
    }

    return(
        <div>
            <p>{user.email}</p>
            <p>{user.username}</p>
        </div>
    )

    
}

export default App
