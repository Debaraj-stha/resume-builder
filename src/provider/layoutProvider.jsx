import { useContext, createContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "styled-components";

export const LayoutContext = createContext(null);

const LayoutProvider = ({ children }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);


  const methods = useForm({
    defaultValues: {
      personalDetails: {
        name: "",
        email: "",
        phone: "",
        profession: "",
        urls: [{ value: "" }],
      },
      educations: [{ university: "", degree: "", start_complete: "" }],
      summary: "",
      experiences: [
        {
          companyName: "",
          position: "",
          aboutCompany: "",
          acheivements: [{ value: "" }]

        },
      ],
      acheivements: [{ acheivement: "", field: "", date: "" }],
      skills: [{field:"basic",items:[""]}],
    },
  });

 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);




  const values = { theme, isLoading };
  return (
    <LayoutContext.Provider value={values}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
export const useLayout = () => useContext(LayoutContext);
