import { Button } from "./CustomComponents";

import { useNavigate } from "react-router-dom";

const LoginButton = () => {
 const navigate=useNavigate()
 const handleButtonClick=()=>{
  navigate("/login")
 }

  return (
    <div>
      <Button
        onClick={handleButtonClick}
      >
        <span>Login</span>
       
      </Button>
    </div>
  );
};

export default LoginButton;
