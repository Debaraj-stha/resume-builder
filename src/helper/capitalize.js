const capitalize=(string)=>{
    if(!string || string===" ")
        return
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize