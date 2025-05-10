import React,{} from "react";
import { thoughts } from "../static-data/user-thoughts";
import styled,{keyframes} from "styled-components";
import { Avatar, CTAButton, FeatureCard, Heading } from "./CustomComponents";
//only 50% because we  have duplicates data
const scrollLeft=keyframes`
0%{
transform:translateX(0);
}
100%{
transform:translateX(-50%);
}
`
const OuterWrapper=styled.div`
overflow:hidden;
width:100%;
`
const OuterContainer=styled.div`
gap:1.5erm;
display:flex;
width:max-content;
animation: ${scrollLeft} 40s linear infinite;
`


const UserThouhtCard = ({ thought }) => {
    return (
        <FeatureCard>
            <p>{thought.say}</p>
            <footer>— {thought.user}</footer>
            <Avatar>
                <img src={`${thought.profile}`}></img>
            </Avatar>
            <div>
                <p>Source-{thought.source}</p>
            </div>
        </FeatureCard>
    )
}
const UserThought = () => {
    const handleReviews=()=>{

    }
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <Heading>What Users Say</Heading>

                <OuterWrapper>
                    <OuterContainer className="gap-6 w-max overflow-hidden">
                        {[...thoughts, ...thoughts].map((thought, index) => (
                            <div key={index} className="flex-shrink-0 w-[300px]">
                                <UserThouhtCard thought={thought} />
                            </div>
                        ))}
                    </OuterContainer>
                </OuterWrapper>

            </div>
            <CTAButton onClick={handleReviews}>Give Review</CTAButton>
        </section>
    );
};

export default UserThought