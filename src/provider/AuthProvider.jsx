import { createContext, use, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    let isAuthenciated = !!user
    const navigate = useNavigate()
    const location = useLocation()



    const getUser = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
                setUser(null);
                isAuthenciated = false
                // navigate("/login")
            }
            else if (data?.session === null) {
                alert("Please check your email to confirm your account.");
            }
            else {
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user?.user_metadata?.name,
                    picture: data.user?.user_metadata?.picture,
                };
                isAuthenciated = true

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
                const params = new URLSearchParams(location.search)
                console.log("params", params)
                const redirectTo = params.get("redirectTo") || "/"
                navigate(`build-resume/${redirectTo}`);
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
                const params = new URLSearchParams(location.search)
                const redirectTo = params.get("redirectTo") || "/"
                navigate(`build-resume${redirectTo}`);
                return response
            }
        } catch (e) {
            console.log("Unexpected error during OTP login:", e);
        }
    };


    const loginWithEmailAndPassword = async (data, isLogin = true) => {
        try {
            const { email, password } = data;
            let authResult;

            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                authResult = data;
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                authResult = data;
            }
            if (authResult?.session === null) {
                alert("Please check your email to confirm your account.");
            }
            console.log("Auth result:", authResult);

            // Extract redirectTo from query string
            const params = new URLSearchParams(location.search);
            const redirectTo = params.get("redirectTo") || "/";
            console.log("Redirecting to:", redirectTo);
            navigate(`build-resume${redirectTo}`);

        } catch (e) {
            console.error("Auth error:", e.message);
            alert(e.message || "Unexpected error during authentication");
        }
    };



    useEffect(() => {
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

    const contextValue = useMemo(
        () => ({
            user,
            logout,
            loginWithEmailAndPassword,
            loginWithGoogle,
            loginWithLink,
            loading,
            isAuthenciated,
            setLoading,
            getUser
        }), [
        user,
        getUser,
        logout,
        loginWithEmailAndPassword,
        loginWithGoogle,
        loginWithLink,
        loading,
        isAuthenciated,
        setLoading
    ])
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
export const useAuth = () => useContext(AuthContext)