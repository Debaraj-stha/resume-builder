import React, { useEffect } from "react";
import { Hspace } from "../components/CustomComponents";
import Feature from "../components/Features";
import UserThought from "../components/UserThought";
import styled, { keyframes } from "styled-components";
import "../css/home.css"

const TypingAnimation=keyframes`
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
`
const TextWrapper = styled.div`
  color: blue;
  font-weight: 800;
  font-size: 45px;
  letter-spacing: 3px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height:max-content;
`;

const Span=styled.span`
    width:0;
    display:inline-block;
    overflow:hidden;
    word-wrap:nowrap;
   
    height:100%;
    animation: ${TypingAnimation} 2s steps(30) 1s  forwards;
`

const Home = () => {
    useEffect(() => {
        const sections = document.querySelectorAll("section");
      
        const handleScroll = () => {
          sections.forEach((section) => {
            const boundingRect = section.getBoundingClientRect().top;
            if (boundingRect < window.innerHeight - 100) {
                section.classList.add("animate");
              }
          });
        };
      
        handleScroll(); // run once on mount
        window.addEventListener("scroll", handleScroll);       
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
      
      const getStarted=()=>{

      }
      const createCv=()=>{
        
      }
    return (

        <div className="m-auto">
            <Hspace />
            <section className="bg-blue-50 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <TextWrapper>
                    <Span>
                        Build Your Professional CV in Minutes
                    </Span>
                    </TextWrapper>
                    <p className="text-lg text-gray-700">
                        Easy to use, customizable templates. Download your resume instantly.
                    </p>
                    <button onClick={getStarted} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Get Started
                    </button>
                </div>
            </section>
            {/* features of cv builder */}
           <Feature></Feature>
           {/* user thought  to this site */}
           <UserThought></UserThought>
         
            <section className="py-16 bg-blue-600 text-white text-center px-4">
                <h2 className="text-3xl font-bold mb-4">Start Building Your CV Now</h2>
                <p className="mb-6">Join thousands of professionals. It's free and takes less than 5 minutes.</p>
                <button onClick={createCv} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                    Create My CV
                </button>
            </section>

        </div>
    )
}
export default Home