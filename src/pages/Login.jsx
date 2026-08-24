import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiArrowRight, FiCheck, FiEye, FiEyeOff, FiLock, FiMail, FiShield, FiStar } from "react-icons/fi";
import { useAuth } from "../provider/AuthProvider";
import "../css/login.css";

const MODES = { PASSWORD: "password", MAGIC_LINK: "magic-link" };
const FiSparkles = FiStar;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "85473690452-o266vp2bqcs6lsurv9ajsk2na640vo50.apps.googleusercontent.com";

function GoogleIdentityButton({ onCredential, disabled }) {
  const host = useRef(null);
  const callbackRef = useRef(onCredential);
  callbackRef.current = onCredential;

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !host.current || !window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: response => callbackRef.current(response?.credential), auto_select: false });
      host.current.replaceChildren();
      window.google.accounts.id.renderButton(host.current, { type: "standard", theme: "outline", size: "large", text: "continue_with", shape: "rectangular", logo_alignment: "left", width: Math.min(400, Math.max(260, host.current.clientWidth || 360)) });
    };
    if (window.google?.accounts?.id) render();
    else {
      let script = document.querySelector('script[data-resuai-google-identity]');
      if (!script) {
        script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.dataset.resuaiGoogleIdentity = "true";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render, { once: true });
    }
    return () => { cancelled = true; };
  }, []);

  return <div className={`google-identity-wrap${disabled ? " disabled" : ""}`} ref={host} aria-label="Continue with Google" />;
}

export default function Login() {
  const [mode, setMode] = useState(MODES.PASSWORD);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { loginWithEmailAndPassword, loginWithGoogleToken, loginWithLink } = useAuth();
  const schema = useMemo(() => z.object({ email: z.string().min(1, "Enter your email address").email("Enter a valid email address"), ...(mode === MODES.PASSWORD ? { password: z.string().min(8, "Password must contain at least 8 characters").max(72, "Password is too long") } : {}) }), [mode]);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ resolver: zodResolver(schema) });
  const chooseMode = nextMode => { setMode(nextMode); setFeedback(null); reset(); };

  const onSubmit = async data => {
    setSubmitting(true); setFeedback(null);
    try { const response = mode === MODES.PASSWORD ? await loginWithEmailAndPassword(data, !creating) : await loginWithLink(data.email); setFeedback(response); if (response?.status === "success") reset(); }
    catch { setFeedback({ status: "error", message: "We could not complete that request. Please try again." }); }
    finally { setSubmitting(false); }
  };
  const connectGoogle = async credential => { setSubmitting(true); setFeedback(null); try { const response = await loginWithGoogleToken(credential); if (response?.status === "error") setFeedback(response); } finally { setSubmitting(false); } };

  return <main className="premium-login-page">
    <section className="login-value-panel">
      <Link className="login-brand" to="/"><span>R</span><div><strong>ResuAIBuilder</strong><small>Healthcare Career OS</small></div></Link>
      <div className="login-value-copy"><span className="login-eyebrow"><FiSparkles/> BUILT FOR HEALTHCARE CAREERS</span><h1>One secure workspace for your next career move.</h1><p>Build a stronger CV, prepare for licensing pathways and practise interviews with tools designed around healthcare professionals.</p><ul><li><FiCheck/> AI-guided CV and ATS improvement</li><li><FiCheck/> DHA, DOH and GCC licensing practice</li><li><FiCheck/> Healthcare interview coaching</li></ul></div>
      <div className="login-trust"><FiShield/><div><strong>Your professional information stays yours</strong><small>Secure authentication powered by Supabase.</small></div></div>
    </section>
    <section className="login-form-panel"><div className="premium-login-card">
      <header><span>{creating ? "CREATE YOUR WORKSPACE" : "WELCOME BACK"}</span><h2>{creating ? "Start your healthcare career workspace" : "Sign in to continue"}</h2><p>{creating ? "Create one secure account to save your work and progress." : "Access your CVs, practice results and career tools."}</p></header>
      <GoogleIdentityButton onCredential={connectGoogle} disabled={submitting} />
      <div className="login-divider"><span>or continue with email</span></div>
      <div className="login-mode-tabs" role="tablist" aria-label="Sign-in method"><button type="button" role="tab" aria-selected={mode === MODES.PASSWORD} className={mode === MODES.PASSWORD ? "active" : ""} onClick={() => chooseMode(MODES.PASSWORD)}>Password</button><button type="button" role="tab" aria-selected={mode === MODES.MAGIC_LINK} className={mode === MODES.MAGIC_LINK ? "active" : ""} onClick={() => chooseMode(MODES.MAGIC_LINK)}>Email link</button></div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="login-field"><span>Email address</span><div><FiMail/><input type="email" autoComplete="email" placeholder="you@example.com" {...register("email")}/></div>{errors.email ? <small className="field-error">{errors.email.message}</small> : null}</label>
        {mode === MODES.PASSWORD ? <label className="login-field"><span>Password</span><div><FiLock/><input type={showPassword ? "text" : "password"} autoComplete={creating ? "new-password" : "current-password"} placeholder="At least 8 characters" {...register("password")}/><button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(value => !value)}>{showPassword ? <FiEyeOff/> : <FiEye/>}</button></div>{errors.password ? <small className="field-error">{errors.password.message}</small> : null}</label> : <p className="magic-link-note"><FiShield/> We’ll send a secure, one-time sign-in link to your inbox.</p>}
        {feedback?.message ? <div className={`login-feedback ${feedback.status}`} role="status">{feedback.message}</div> : null}
        <button className="login-submit" type="submit" disabled={submitting}><span>{submitting ? "Please wait…" : mode === MODES.MAGIC_LINK ? "Email me a secure link" : creating ? "Create my account" : "Sign in securely"}</span><FiArrowRight/></button>
      </form>
      {mode === MODES.PASSWORD ? <button className="account-mode-switch" type="button" onClick={() => { setCreating(value => !value); setFeedback(null); }}>{creating ? "Already have an account? Sign in" : "New to ResuAIBuilder? Create a free account"}</button> : null}
      <p className="login-legal">By continuing, you agree to our <Link to="/privacy">Privacy Policy</Link> and <Link to="/refund-policy">Terms</Link>.</p>
    </div></section>
  </main>;
}
