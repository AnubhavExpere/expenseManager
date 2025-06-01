import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/UserAPI";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState({});

    useEffect(()=> {
        const fetchUserData = async () => {
            try {
                const result = await getUser(userId);
                setUser(result);
                // console.log(result);                
            } catch (err) {
                console.log('Error fetching user data. \n', err);
            }
        }
        fetchUserData();
    }, [])

    return (
        <UserContext.Provider value={{userId, user}}>
            {props.children}
        </UserContext.Provider>
    )
}