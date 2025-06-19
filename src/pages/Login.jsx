import styled from "styled-components";
import "../components/layouts/css/google-fonts.css";
//google icon
import google_icon from "../assets/google_icon.svg"
import { useEffect, useState } from "react";
import { Hspace } from "../components/CustomComponents";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../provider/AuthProvider";

//styled elements

const Wrapper = styled.div`
    font-family: 'Roboto', sans-serif;
    height: 100vh; /* Full viewport height */
    width: 100vw;  /* Full viewport width */
    display: flex;
    justify-content: center;
    align-items: center;
  

`;
const Card = styled.div`
  background: ${({ theme }) => theme.colors.card.background || "#fff"};
  width: 100%;
  max-width: 470px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2), -3px -3px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.card.border || "#f9f9f9"};
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  /* Hover effect */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3), -3px -3px 15px rgba(0, 0, 0, 0.2);
  }
@media:(max-width:768px){
font-weight:14px;
}
 
`;


const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
  color:${({ theme }) => theme.colors.card.text || "black"};
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 16px;
  &:focus{
  outline:none;
  border-color:${({ theme }) => theme.colors.accent || "blue"};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.button['primary'].bg || "green"};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverBg || "rgba(0,255,0,0.5"};
    color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverText || "white"};
  }
    @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const GoogleLoginButton = styled(Button)`
  background: #fff;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  &:hover {
    background-color: #f7f7f7;
    color:#000;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  span {
    font-size: 15px;
  }
`;


const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 16px 0;

  button {
    flex: 1;
    font-size: 14px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.card.border || "#ddd"};
    background-color: ${({ theme }) => theme.colors.card.background || "#f0f0f0"};
    color: ${({ theme }) => theme.colors.card.text || "#333"};
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.button.primary.hoverBg || "#ddd"};
    }
  }
`;
const ModeButton = styled.button.withConfig({
  // shouldForwardProp: (props) => !['selected'].includes(props)
})`
  background: ${({ selected }) => (selected ? "blue" : "#f0f0f0")};
  margin:0;
  color: ${({ selected }) => (selected ? "white" : "#333")};
   @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ErrorMessage = styled.p`
font-family:'Roboto',sans serif;
font-size:14px;
text-align:left;
color:#d23131;
`
const InputFieldWrapper = styled.div`
  margin-bottom: 16px;
`



const Login = () => {
  const modes = {
    EMAIL_PASSWORD: "email_password",
    EMAIL_LINK: "email_link"
  }
  const [selected, setSelected] = useState(modes.EMAIL_PASSWORD)
  const [show, setShow] = useState(false)
  const {
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithLink,
  } = useAuth()

  const handleModeSelect = (mode) => {
    if (mode === selected) return
    setSelected(mode)
  }

  const handleResize = () => {
    const shouldShow = window.innerWidth <= 600;
    setShow(shouldShow);

  };
  useEffect(() => {
    handleResize();
    // Add resize listener
    window.addEventListener("resize", handleResize);
    //remove the listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  //dynamically selecting schema for login with email and password and simply with email and opt
  const getSchema = (mode) => {
    const base = {
      email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
    };

    if (mode === modes.EMAIL_PASSWORD) {
      base.password = z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password should be at least 8 characters" })
        .max(15, { message: "Password must be less than 15 characters" });
    }

    return z.object(base);
  };
  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(getSchema(selected))
  })



  const onSubmit = async (data) => {
    let response;
    if (selected === modes.EMAIL_PASSWORD) {
      response = await loginWithEmailAndPassword(data, false)
    }
    else {
      response = await loginWithLink(data.email)
    }
    if (response?.status === "success") {
      reset()//clearing from field
      // const params = new URLSearchParams(location.search)
      // const redirectTo = params.get("redirectTo") || "/"
      // navigate(redirectTo)
    }
  }


  //login with google

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle()
  }




  const Email = (

    <InputFieldWrapper>
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
    </InputFieldWrapper>

  )
  return (
    <>
      {/* render only on small devices  it will add vertical gap between card and navbar*/}
      {show && <Hspace />}
      <Wrapper>
        <Card>
          <Title>Login</Title>
          <GoogleLoginButton onClick={handleLoginWithGoogle}>
            <img src={google_icon} alt="google icon" />
            <span>Continue With Google</span>
          </GoogleLoginButton>
          <ButtonGroup>
            <ModeButton selected={selected === modes.EMAIL_PASSWORD} onClick={() => handleModeSelect(modes.EMAIL_PASSWORD)}>
              With Email And Password
            </ModeButton>
            <ModeButton selected={selected === modes.EMAIL_LINK} onClick={() => handleModeSelect(modes.EMAIL_LINK)}>
              With Email Link
            </ModeButton>
          </ButtonGroup>

          <form onSubmit={handleSubmit(onSubmit)}>
            {
              selected === modes.EMAIL_PASSWORD ?
                <>

                  {Email}

                  <InputFieldWrapper>
                    <Input type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                  </InputFieldWrapper>
                </>
                :

                Email

            }
            <Button type="submit">Log In</Button>
          </form>
        </Card>
      </Wrapper>
    </>
  );
};


export default Login;
