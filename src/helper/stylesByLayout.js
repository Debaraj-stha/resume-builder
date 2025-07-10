import { headerStyle, nameStyle, subSubHeaderStyle } from "./pdf/style";


export const stylesByLayout = {
    classical: {
        layout_1: {
            headerStyle: {
                font: {
                    family: 'helvetica'
                },
                contactStyle: {
                    align: "center",
                    listStyle: "disc"
                }
            },
            subHeaderStyle: {

            },
            subSubHeaderStyle: {

            },
            normalStyle: {

            },
            nameStyle: {
                // fontFamily: "Arial, sans-serif",
            }
        },
        layout_2: {
            headerStyle: {
                align: "left",
                contactStyle: {
                    color: "blue",
                    iconSize: 7,
                }

            },
            subHeaderStyle: {
                color: [0, 0, 255],
                align: "left"
            },
            nameStyle: {
                align: "left"
            }
        },
        layout_3: {
            headerStyle: {
                align: "left",
                contactStyle: {
                    align: "center",
                    listStyle: "disc"
                }

            },
            subSubHeaderStyle: {
                color: [0, 0, 255],
                //  align: "center"

            }
        },
        layout_4: {
            headerStyle: {
                align: "left"
            },
            nameStyle: {
                align: "left"
            }
        },
        layout_5: {
            headerStyle: {
                align: "left"
            },
            nameStyle: {
                align: "left"
            }
        },
        layout_6: {
            headerStyle: {
                align: "left"
            },
            nameStyle: {
                align: "left"
            }
        }
    },
    modern: {
        layout_1: {
            nameStyle:{
                align:"left"
            },
            headerStyle:{
                align:"left"
            },
            subSubHeaderStyle:{
                color:[0,0,255],
                align:"left"
            }
        },
        layout_2: {

        },
        layout_3: {

        },
        layout_4: {

        },
        layout_5: {

        },
        layout_6: {

        }
    },
    simple: {
        layout_1: {

        },
        layout_2: {

        },
        layout_3: {

        },
        layout_4: {

        },
        layout_5: {

        },
        layout_6: {

        }
    },
    creative: {
        layout_1: {
        },
        layout_2: {

        },
        layout_3: {

        },
        layout_4: {

        },
        layout_5: {

        },

        layout_6: {

        }
    }
}