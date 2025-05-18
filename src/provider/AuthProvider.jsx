import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabaseClient"
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const isAuthenciated = !!user


    const getUser = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
                setUser(null);
            } else {
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user?.user_metadata?.name,
                    picture: data.user?.user_metadata?.picture,
                };
             
                setUser(user);
            }
        } catch (err) {
            console.error("Unexpected error while getting user:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };




    const logout = async () => {
        await supabase.auth.signOut()
        alert("signout success")
    }

    const loginWithGoogle = async () => {
        try {
            const { user, session, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            if (error) {
                console.error("OAuth Login Error: ", error);
                alert("Failed to log in with Google. Please try again.");
                return;
            }
            console.log("Logged in successfully:", user);
            if (user) {

            }
        } catch (error) {
            console.log("Unexpected error while login with google", error)
        }

    }
    const loginWithLink = async (email) => {
        try {
            const { data, error } = await supabase.auth.signInWithOtp({ email });
            const response = {}
            if (error) {
                console.error("OTP Login failed:", error);
                alert(error.message);
            } else {
                alert("Check your email for the login link.");
                response.status = "success"
                return response
            }
        } catch (e) {
            console.log("Unexpected error during OTP login:", e);
        }
    };

    const loginWithEmailAndPassword = async (data, isLogin = true) => {
        try {
            const { email, password } = data;
            let result;
            const response = {}
            if (isLogin) {
                result = await supabase.auth.signInWithPassword({ email, password });
            } else {
                result = await supabase.auth.signUp({ email, password });
            }

            const res = {
                uuid: result.data.user.id,
                email: result.data.user.email,
                name: result.data.user.user_metadata
            }
            const { data: authData, error } = result;

            if (error) {
                alert(error.message);
            } else {
                response.status = "success"
                alert(`${isLogin ? " Login" : "Signup"} successfull`);


            }
        } catch (e) {
            console.log("Unexpected error during auth:", e);
        }
    };


    useEffect(() => {
        // const fetchUser=async()=>{
        //     await getUser()
        // }
        // fetchUser()
        getUser()
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                getUser();
            } else {
                setUser(null);
            }
        });

        // Cleanup listener on unmount
        return () => {
            listener.subscription.unsubscribe();
        };
    }, [])

    const values = {
        user,
        logout,
        loginWithEmailAndPassword,
        loginWithGoogle,
        loginWithLink,
        loading,
        isAuthenciated,
        setLoading

    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
export const useAuth = () => useContext(AuthContext)