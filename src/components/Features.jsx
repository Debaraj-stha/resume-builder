import React from "react";
import { features } from "../static-data/feature-data";

const FeatureCard = ({feature}) => {
    
    return (
        <div>
            <h3 className="text-xl font-semibold text-blue-600">{feature.heading}</h3>
            <p className="text-gray-600 mt-2">{feature.content}</p>
        </div>
    )
}
const Feature=()=>{
    return(
        <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {
                features.map((feature,index)=>(
                    <FeatureCard key={index} feature={feature}></FeatureCard>
                ))
            }
        </div>
    </section>
    )
}
export default Feature