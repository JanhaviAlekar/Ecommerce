import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    //default axios
    axios.defaults.headers.common('Authorization') = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        //eslint-disable-next-line
    }, [])
    return (
        <AuthProvider value={[auth, setAuth]}>
            {children}
        </AuthProvider>
    )
}

//custom hook starts with use
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }