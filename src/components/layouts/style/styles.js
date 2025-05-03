import { lazy } from "react"

const style={
    "classical":{
        "1":lazy(()=>import("../classic/layout-1/style")),
        "2":lazy(()=>import("../classic/layout-2/style")),
        "3":lazy(()=>import("../classic/layout-3/style")),
        "4":lazy(()=>import("../classic/layout-4/style")),
        "5":lazy(()=>import("../classic/layout-5/style")),
        "6":lazy(()=>import("../classic/layout-6/style")),
    },
    "modern":{
        "1":lazy(()=>import("../modern/layout-1/style")),
        "2":lazy(()=>import("../modern/layout-2/style")),
        "3":lazy(()=>import("../modern/layout-3/style")),
        "4":lazy(()=>import("../modern/layout-4/style")),
        "5":lazy(()=>import("../modern/layout-5/style")),
        "6":lazy(()=>import("../modern/layout-6/style"))
    },
    "creative":{
        "1":lazy(()=>import("../creative/layout-1/style")),
        "2":lazy(()=>import("../creative/layout-2/style")),
        "3":lazy(()=>import("../creative/layout-3/style")),
        "4":lazy(()=>import("../creative/layout-4/style")),
        "5":lazy(()=>import("../creative/layout-5/style")),
       
    },
    "simple":{
        "1":lazy(()=>import("../simple/layout-1/style")),
        "2":lazy(()=>import("../simple/layout-2/style")),
        "3":lazy(()=>import("../simple/layout-3/style")),
        "4":lazy(()=>import("../simple/layout-4/style")),
        "5":lazy(()=>import("../simple/layout-5/style")),
        "6":lazy(()=>import("../simple/layout-6/style"))
    }

}

export default style