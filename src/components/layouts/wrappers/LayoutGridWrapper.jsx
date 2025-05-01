 const LayoutGridWrapper = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
        {children}
    </div>
)

export default LayoutGridWrapper