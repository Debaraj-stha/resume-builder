export const defaultEducation = [{ university: "", degree: "", start_year: "", gpa: "", end_year: "", address: "" }]
export const defaultPersonalDetails = {
    name: "",
    email: "",
    phone: "",
    profession: "",
    address: "",
    profile: "",
    urls: [{ value: "" }],
}
export const defaultExperiences = [
    {
        company_name: "",
        position: "",
        about_company: "",
        start_date: "",
        end_date: "",
        location: "",
        achievements: [{ value: "" }]

    },
]
export const defaultAchievements = [{ achievement: "", field: "", date: "" }]
export const defaultSkills = [{ field: " ", items: [{ value: "" }] }]
export const defaultLanguages = [
    {
        language: "",
        proficiency: ""
    }
]
export const defaultTrainings = [
    {
        title: "",
        organization: "",
        year: "",
        location: ""
    }
]
export const defaultAwards = [
    {
        title: "",
        organization: "",
        year: ""
    },
]
export const defaultpassions = [{ passion: "" }]
export const defaultstrengths = [
    {
        title: "",
        description: ""
    },
]
export const defaultOpenSourceWork = [
    {
        project_name: "",
        role: "",
        description: "",
        technologies: [{ value: "" }],
        link: "",
        date: ""
    },
]
export const defaultIndustryExpertise = [
    {
        tech: "",
        value: ""
    }
]
export const defaultCertificates = [
    {
        certificate: "",
        subject: "",
        date: ""
    },
]
export const defaultmy_time = [
    {
        activity: "",
        value: ""
    }
]
const defaultFormFields = {
    personalDetails: defaultPersonalDetails,
    educations: defaultEducation,
    summary: "",
    experiences: defaultExperiences,
    achievements: defaultAchievements,
    skills: defaultSkills,
    languages: defaultLanguages,
    trainings: defaultTrainings,
    awards: defaultAwards,
    passions: defaultpassions,
    strengths: defaultstrengths,
    openSourceWork: defaultOpenSourceWork,
    industryExpertise: defaultIndustryExpertise,
    certificates: defaultCertificates,
    my_time: defaultmy_time,
}
export default defaultFormFields