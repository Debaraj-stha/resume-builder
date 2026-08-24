import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import Modal from "./Modal";
import { useAuth } from "../provider/AuthProvider";
import LoginButton from "./LoginButton";
import profileHolder from "../assets/profile_holder.jpg";

const Account = styled.div`position:relative;z-index:120;display:flex;align-items:center;`;
const Trigger = styled.button`
  display:flex!important;align-items:center!important;gap:8px!important;width:auto!important;height:44px!important;
  margin:0!important;padding:5px 9px!important;border:1px solid rgba(255,255,255,.18)!important;
  border-radius:12px!important;background:rgba(255,255,255,.08)!important;color:inherit!important;cursor:pointer;
  >img,.initial{display:grid!important;place-items:center!important;flex:0 0 32px!important;width:32px!important;height:32px!important;max-width:32px!important;max-height:32px!important;border-radius:50%!important;object-fit:cover!important;background:#79dfd2;color:#063d3b;font-weight:900;font-size:.9rem!important}
  .copy{display:block;text-align:left;max-width:92px}.copy strong,.copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.copy strong{font-size:.75rem}.copy small{font-size:.62rem;opacity:.75}
  >svg{flex:0 0 auto;transition:.2s}.rotate{transform:rotate(180deg)}
  @media(max-width:1400px){.copy{display:none}}
`;
const Menu = styled.div`
  position:absolute;top:calc(100% + 10px);right:0;z-index:400;width:280px;padding:10px;border:1px solid #dbe8e5;border-radius:14px;background:#fff;color:#183b48;box-shadow:0 22px 60px rgba(6,35,52,.22);
  .summary{display:flex;align-items:center;gap:10px;padding:8px 8px 13px;margin-bottom:6px;border-bottom:1px solid #e8efed}.summary img{flex:0 0 40px;width:40px!important;height:40px!important;max-width:40px!important;border-radius:50%;object-fit:cover}.summary strong,.summary small{display:block;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.summary small{margin-top:3px;color:#71858a;font-size:.72rem}
  a,button{display:flex!important;align-items:center!important;gap:10px!important;width:100%!important;margin:0!important;padding:11px!important;border:0!important;border-radius:9px!important;background:transparent!important;color:#294a55!important;text-align:left;text-decoration:none;font:inherit;font-size:.85rem!important;font-weight:700!important;cursor:pointer}
  a:hover{background:#eff8f6!important;color:#0f766e!important}.logout{color:#b42318!important}.logout:hover{background:#fff1ef!important}
  @media(max-width:620px){position:fixed;top:72px;right:12px;width:min(280px,calc(100vw - 24px))}
`;
const ModalActions = styled.div`display:flex;justify-content:flex-end;gap:10px;button{padding:10px 14px;border:1px solid #cad8d6;border-radius:9px;background:#fff;color:#24434d;font-weight:750;cursor:pointer}.confirm{border-color:#b42318;background:#b42318;color:#fff}`;

export default function UserCard() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const closeOutside = event => { if (!accountRef.current?.contains(event.target)) setMenuOpen(false); };
    const closeOnEscape = event => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", closeOutside); document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("mousedown", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, []);

  if (loading) return null;
  if (!user) return <LoginButton />;
  const displayName = user.name || user.email?.split("@")[0] || "My account";

  return <Account ref={accountRef}>
    <Trigger type="button" aria-label="Open account menu" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
      {user.picture ? <img src={user.picture} alt="" referrerPolicy="no-referrer"/> : <span className="initial">{displayName.charAt(0).toUpperCase()}</span>}
      <span className="copy"><strong>{displayName}</strong><small>My account</small></span><FiChevronDown className={menuOpen ? "rotate" : ""}/>
    </Trigger>
    {menuOpen ? <Menu role="menu"><div className="summary"><img src={user.picture || profileHolder} alt="" referrerPolicy="no-referrer"/><div><strong>{displayName}</strong><small>{user.email}</small></div></div><Link to="/dashboard" role="menuitem" onClick={() => setMenuOpen(false)}><FiUser/> My workspace</Link><button className="logout" type="button" role="menuitem" onClick={() => { setMenuOpen(false); setConfirmOpen(true); }}><FiLogOut/> Log out</button></Menu> : null}
    {confirmOpen ? <Modal onClose={() => setConfirmOpen(false)} header="Log out of ResuAIBuilder?" footer={<ModalActions><button type="button" onClick={() => setConfirmOpen(false)}>Cancel</button><button type="button" className="confirm" onClick={async () => { await logout(); setConfirmOpen(false); }}>Log out</button></ModalActions>}><p style={{color:"#5e737b",lineHeight:1.55,margin:0}}>Are you sure you want to log out?</p></Modal> : null}
  </Account>;
}
