import styled from "styled-components"

  //showung name initial as image
  const RectangularContainer = styled.div`
    border-radius: 5px;
    height: 130px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: auto;
    background:${({ backgroundColor }) => backgroundColor || "#660c09"};
`
  const NameInitial = ({name}) => {
    const names = name.split(" ")
    const fnameFirstChar = names?.[0]?.[0]
    const lnameFirstChar = names?.[1]?.[0]
    //display initial letter as image
    return <RectangularContainer><h1>{fnameFirstChar}{lnameFirstChar}</h1></RectangularContainer>
  }
  export default NameInitial