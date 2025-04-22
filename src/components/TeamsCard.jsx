import React from "react";
import { Avatar, Heading, Team, TeamGrid, TeamMember } from "./CustomComponents";
import { members } from "../static-data/team-members";
const Teamscard=()=>{
    return(
        <Team>
        <Heading>Meet the Team</Heading>
        <TeamGrid>
            {members.map((member) => (
                <TeamMember key={member.name}>
                    <Avatar>
                        <img src={member.profile} alt={`${member.name} Profile`} />
                    </Avatar>
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                </TeamMember>
            ))}
        </TeamGrid>
    </Team>
    )
}
export default Teamscard