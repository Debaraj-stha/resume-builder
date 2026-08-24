import { createContext, use, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext()
const OAUTH_REDIRECT_KEY = "resuai_oauth_redirect";
const LIVE_SITE_ORIGIN = "https://www.resuaibuilder.com";
const SITE_ORIGIN = window.location.hostname === "resuaibuilder.com" || window.location.hostname === "www.resuaibuilder.com"
    ? LIVE_SITE_ORIGIN
    : String(import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");

const profileFromSession = (session) => {
    const authUser = session?.user;
    if (!authUser) return null;
    return {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name,
        picture: authUser.user_metadata?.picture || authUser.user_metadata?.avatar_url,
    };
};

const getRedirectPath = (search) => {
    const requestedPath = new URLSearchParams(search).get("redirectTo");
    return requestedPath?.startsWith("/") ? requestedPath : "/uae-healthcare-jobs";
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    let isAuthenciated = !!user
    const navigate = useNavigate()
    const location = useLocation()



    const getUser = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error getting user:", error);
                setUser(null);
                isAuthenciated = false
                // navigate("/login")
            }
            else if (!data?.session?.user) {
                setUser(null);
                isAuthenciated = false;
            } else {
                const user = profileFromSession(data.session);
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
        const { error } = await supabase.auth.signOut()
        if (error) return { status: "error", message: error.message }
        setUser(null)
        navigate("/", { replace: true })
        return { status: "success" }
    }

    const loginWithGoogle = async () => {
        try {
            const redirectPath = getRedirectPath(location.search);
            sessionStorage.setItem(OAUTH_REDIRECT_KEY, redirectPath);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${SITE_ORIGIN}/login`,
                    queryParams: {
                        prompt: "select_account",
                    },
                },
            })
            if (error) {
                sessionStorage.removeItem(OAUTH_REDIRECT_KEY);
                console.error("OAuth Login Error: ", error);
                return { status: "error", message: error.message };
            }
            return { status: "success", data };
        } catch (error) {
            console.error("Unexpected error while logging in with Google", error)
            return { status: "error", message: error.message };
        }

    }
    const loginWithGoogleToken = async (credential) => {
        try {
            if (!credential) return { status: "error", message: "Google did not return a secure sign-in token." };
            const { data, error } = await supabase.auth.signInWithIdToken({ provider: "google", token: credential });
            if (error) throw error;
            const authenticatedUser = profileFromSession(data?.session);
            if (!authenticatedUser) throw new Error("Google sign-in completed without an account session.");
            setUser(authenticatedUser);
            navigate(getRedirectPath(location.search), { replace: true });
            return { status: "success" };
        } catch (error) {
            console.error("Google ID-token login failed:", error?.message);
            return { status: "error", message: error?.message || "Google sign-in could not be completed." };
        }
    };
    const loginWithLink = async (email) => {
        try {
            const redirectPath = getRedirectPath(location.search);
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: `${SITE_ORIGIN}${redirectPath}` },
            });
            if (error) {
                console.error("OTP Login failed:", error);
                return { status: "error", message: error.message };
            } else {
                return { status: "success", data, message: "Check your email for the secure login link." };
            }
        } catch (e) {
            console.error("Unexpected error during OTP login:", e);
            return { status: "error", message: e.message };
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
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { emailRedirectTo: `${SITE_ORIGIN}/login?confirmed=1` },
                });
                if (error) throw error;
                authResult = data;
            }
            if (authResult?.session) {
                navigate(getRedirectPath(location.search));
                return { status: "success" };
            }

            return {
                status: "success",
                message: "Account created. Check your email to confirm it, then sign in.",
            };

        } catch (e) {
            console.error("Auth error:", e.message);
            return { status: "error", message: e.message || "Unexpected error during authentication" };
        }
    };



    useEffect(() => {
        getUser()
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            // Supabase supplies the authoritative session here. Calling getSession()
            // again from inside this callback can stall OAuth/password completion.
            const authenticatedUser = profileFromSession(session);
            if (authenticatedUser) {
                setUser(authenticatedUser);
                setLoading(false);
                if (event === "SIGNED_IN" && location.pathname === "/login") {
                    const redirectPath = sessionStorage.getItem(OAUTH_REDIRECT_KEY) || getRedirectPath(location.search);
                    sessionStorage.removeItem(OAUTH_REDIRECT_KEY);
                    navigate(redirectPath, { replace: true });
                }
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
            loginWithGoogleToken,
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
        loginWithGoogleToken,
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
