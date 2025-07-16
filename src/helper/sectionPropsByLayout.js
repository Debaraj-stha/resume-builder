

export const sectionPropsByLayout = {
  classical: {
    layout_1: {
      personalDetailsProps: {
        includeIcon: false,
        includeAddress: false,
        centeredProfession:true
      },
      summaryProps: {},
      experiencesProps: {
        eachItemAsSection: true,
        // groupItems: true,
        // itemPerGroup:3
      },
      educationProps: {},
      achievementsProps: {
        displayGrid: true,
        gridSize: 2
      },
      skillsProps: {},
      commonProps:{

      }
    },
    layout_2: {
      experiencesProps: {
        eachItemAsSection: true,
        includeIcon: true,
        //  includeDateAndAddress:true
      },
      strengthsProps: {
        eachItemAsSection: true,
      },
      skillsProps: {
        borderBox: true,
      },
      strengthsProps: {
        eachItemAsSection: true,
        grid: true,
        groupItems: true,
      },
      commonProps: {
        align: "left",
      }
    },
    layout_3: {
      personalDetailsProps: {
        includeIcon: false,
        includeAddress: true,
        centeredProfession: true

      },
      experiencesProps: {
        eachItemAsSection: true,
        // applyFlex:true,
        includeDate: true,
        onSameLine: true,
      },
      educationProps: {
        shouldIncludeDate: true,
        applyFlex: true
      },
      skillsProps: {
        shouldIncludeField: true
      },
      commonProps: {
        alignHeadingLeft: true,
      }
    },
    layout_4: {
      personalDetailsProps: {
        includeAddress: true,
        addressOnNextLine: true,
        includeProfession: false
      },
      skillsProps: {
        borderBottom: true
      },
      educationProps: {
        applyVerticalDivider: true,
        eachItemAsSection: true,
      },
      experiencesProps: {
        applyVerticalDivider: true,
        eachItemAsSection: true,
      },

      certificatesProps: {
        eachItemAsSection: true,
        groupItems: true,
        grid: true
      },
      achievementsProps: {
        eachItemAsSection: true,
        groupItems: true,
        grid: true,
        shouldIncludeDate: true
      },
      commonProps: {
        alignHeadingLeft: true,
        align: "left"
      },
      headers: {
        skills: "Technical Skills",
      }
    },
    layout_5: {
      headers: {
        skills: "Tech Stack",
      },
      personalDetailsProps: {
        includeIcon: false,
        includeProfession: false
      },
      commonProps: {
        alignHeadingLeft: true,
        align: "left"
      },
      educationProps: {
        eachItemAsSection: true,
        shouldIncludeDate: true
      },
      experiencesProps: {
        eachItemAsSection: true,

        applyFlex: true,
        includeDateAndAddress: true,
      },
      certificatesProps: {
        eachItemAsSection: true,
        groupItems: true,
        grid: true
      },
      achievementsProps: {
        shouldIncludeDate: true,
        eachItemAsSection: true,
        groupItems: true,
        grid: true
      }
    },
    layout_6: {
      personalDetailsProps: {
        includeIcon: true,
        includeProfession: false,
        addressOnNextLine: true,
      },
      commonProps: {
        alignHeadingLeft: true,
        align: "left"
      },
      educationProps: {
        eachItemAsSection: true,
        includeDate: true,
      },
      experiencesProps: {
        eachItemAsSection: true,
        includeIcon: true,
        includeDate: true,
        includeAddress: true,
      },
      certificatesProps: {
        eachItemAsSection: true,
        groupItems: true,
        grid: true,
        shouldIncludeDate: true
      },

      headers: {
        summary: "summary of qualifications",
        skills: "Technical Skills",
      }
    },
  },
  modern: {
    layout_1: {
      experiencesProps:{
        eachItemAsSection:true
      },
      commonProps: {
        columnLayout: true,
        align:"left",
        isHeadingLeft:true
      },
      pagePadding: {
        rightColumnPadding: {
          top: 0,
        },
        leftColumnPadding: {

        }
      },

    },
    layout_2: {},
    layout_3: {},
    layout_4: {},
    layout_5: {},
    layout_6: {},
  },
  simple: {
    layout_1: {},
    layout_2: {},
    layout_3: {},
    layout_4: {},
    layout_5: {},
    layout_6: {},
  },
  creative: {
    layout_1: {},
    layout_2: {},
    layout_3: {},
    layout_4: {},
    layout_5: {},
    layout_6: {},
  }
}