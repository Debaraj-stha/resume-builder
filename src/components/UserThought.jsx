import React,{} from "react";
import { thoughts } from "../sttaic-data/user-thoughts";
import styled,{keyframes} from "styled-components";
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
        <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-700">{thought.say}</p>
            <footer className="mt-2 text-sm text-blue-600">— {thought.user}</footer>
            <div className="flex justify-center items-center">
                <img src={`${thought.profile}`} className="w-[50px] h-[50px] rounded-full"></img>
            </div>
            <div className="mt-5">
                <p className="text-black text-sm">Source-{thought.source}</p>
            </div>
        </div>
    )
}
const UserThought = () => {
    const handleReviews=()=>{

    }
    return (
        <section className="py-16 bg-gray-50 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">What Users Say</h2>

                <OuterWrapper>
                    <OuterContainer className="gap-6 w-max">
                        {[...thoughts, ...thoughts].map((thought, index) => (
                            <div key={index} className="flex-shrink-0 w-[300px]">
                                <UserThouhtCard thought={thought} />
                            </div>
                        ))}
                    </OuterContainer>
                </OuterWrapper>

            </div>
            <button onClick={handleReviews}
                className="transition-all bg-white text-black hover:bg-blue-500 border-2 border-blue-500  hover:text-white  mt-6">Give Review</button>
        </section>
    );
};

export default UserThought