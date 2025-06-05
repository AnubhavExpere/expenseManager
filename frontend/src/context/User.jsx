import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/UserAPI";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({});

    useEffect(()=> {
        const fetchUserData = async () => {
            try {
                const result = await getUser();
                if(result.length > 0)
                    setUser(result[0]);           
            } catch (err) {
                console.log('Error fetching user data. \n', err);
            }
        }
        fetchUserData();
    }, [])

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}