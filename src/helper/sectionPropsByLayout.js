export const sectionPropsByLayout = {
  classical: {
    layout_1: {
      personalDetailsProps: {
        includeIcon: false,
  
        includeAddress: false,
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



    },
    layout_2: {
      experiencesProps: {
        //  eachItemAsSection: true,
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
        includeAddress:true,
        centeredProfession:true

      },
      experiencesProps: {
        eachItemAsSection: true,
        // applyFlex:true,
        includeDate: true,
        onSameLine: true,
      },
      educationProps:{
        shouldIncludeDate: true,
        applyFlex:true
      },
      skillsProps:{
        shouldIncludeField:true
      },
      commonProps: {
        alignHeadingLeft: true,
      }
    },
    layout_4: {},
    layout_5: {},
    layout_6: {},
  },
  modern: {
    layout_1: {},
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