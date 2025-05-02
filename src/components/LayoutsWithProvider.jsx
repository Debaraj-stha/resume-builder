import ClassicalLayouts from "../pages/ClassicalLayouts"

import { PaginationProvider } from "../provider/paginationProvider"
import ModernLayouts from "../pages/ModernLayouts"
import CreativeLayouts from "../pages/CreativeLayouts"
import SimpleLayouts from "../pages/SimpleLayouts"
export const ClassicalLayoutWithProvider = () => (
    <PaginationProvider>
        <ClassicalLayouts />
    </PaginationProvider>
)
export const ModernLayoutWithProvider = () => (
    <PaginationProvider>
        <ModernLayouts/>
    </PaginationProvider>
)

export const CreativeLayoutWithProvider = () => (
    <PaginationProvider>
        <CreativeLayouts/>
    </PaginationProvider>
)
export const SimpleLayoutWithProvider = () => (
    <PaginationProvider>
        <SimpleLayouts/>
    </PaginationProvider>
)