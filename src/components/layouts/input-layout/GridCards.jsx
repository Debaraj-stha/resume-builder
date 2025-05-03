export const GridThree = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-5 my-4">
        {children}
    </div>
)

export const GridTwo = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 my-4">
        {children}
    </div>
)

export const GridFour = ({ children }) => (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4">
        {children}
    </div>
)

export const GridOne=({children})=>(
    <div className=" grid grid-cols-1 gap-2 my-4">
        {children}
    </div>
)
export const GridFive = ({ children }) => (
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 my-4">
        {children}
    </div>
)