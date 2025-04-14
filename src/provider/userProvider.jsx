import { createContext, useContext, useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

// Create context to share user and login functionality
export const UserContext = createContext();

// Custom hook for easy access to user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState("");       // Stores access token
    const [user, setUser] = useState(null);       // Stores user info object

    /**
     * Google login handler using `useGoogleLogin` hook.
     * This must be called at the top level, not inside any other function.
     * It returns a function that you can call to initiate login.
     */
    const googleLogin = useGoogleLogin({
        onSuccess: (res) => {
            setToken(res.access_token); // Set token on successful login
        },
        onError: (err) => {
            console.error("Google login error:", err);
        },
    });

    /**
     * Public login function you can call from components.
     * Checks if user is already logged in (via cookie),
     * if not, it triggers the actual Google login.
     */
    const login = () => {
        const storedUser = readCookie("user");
        if (storedUser) {
            console.log(" User already logged in");
            return;
        }
        googleLogin(); // Initiate Google login
    };

    /**
     * Store user data into a cookie.
     * We encode it to make sure it's safe to store as a URI component.
     */
    const storeToCookie = (data) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Cookie valid for 7 days
        document.cookie = `user=${encodeURIComponent(
            JSON.stringify(data)
        )}; expires=${expires.toUTCString()}; path=/`;
    };

    /**
     * Read a cookie by name and return the value (decoded).
     * Used to check if user data is already stored.
     */
    const readCookie = (name) => {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    };

    /**
     * On mount, check if user data already exists in cookie.
     * If it does, update state with that user data.
     */
    useEffect(() => {
        const storedUser = readCookie("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        console.log(user)
    }, []);

    /**
     * Whenever token is updated (after login), fetch user details
     * from Google's userinfo API using that token.
     */
    useEffect(() => {
        const getDetails = async () => {
            if (!token) return;

            try {
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setUser(data);         // Update state with user info
                storeToCookie(data);   // Store user info in cookie
                console.log(data)
            } catch (e) {
                console.error(" Error while fetching user details:", e);
            }
        };

        getDetails();
    }, [token]);
    //delete user cookie
    const deleteCookie = (name) => {
        const today=new Date()
        const yesterday=today.setDate(today.getDate()-1)
        document.cookie=`${name}=;expires=${yesterday}`
    }
    const logout = async () => {
        
        googleLogout()
        deleteCookie("user")
        setUser(null)//updating user to null

    }

    return (
        <UserContext.Provider value={{ login, user, logout }}>
            {children}
        </UserContext.Provider>
    );
};
