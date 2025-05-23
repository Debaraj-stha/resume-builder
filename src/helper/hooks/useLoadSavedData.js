import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLayout } from "../../provider/layoutProvider";
import { useSupabase } from "../../provider/supabaseProvider";
import { useAuth } from "../../provider/AuthProvider";

const useLoadSavedData = () => {
  const { layout_type, layout_id } = useParams();
  const { isAuthenciated } = useAuth();
  const { isSavedLoaded, setSavedData, setIsSavedLoaded } = useLayout();
  const { getSavedData } = useSupabase();

  useEffect(() => {
    let timer;
    if (!isAuthenciated) {
      //if not authenticate and exceeds 5 seconds, set isSavedLoaded to true
      // this is to prevent infinite loading
      timer = setTimeout(() => {
        setIsSavedLoaded(true);
      }, 5000); 
    }

    if (!isAuthenciated || isSavedLoaded) return;
    (async () => {
      const data = await getSavedData({ layout_type, layout_id });
     
      setSavedData(data);
      setIsSavedLoaded(true);
    })();
    return () => clearTimeout(timer);

  }, [isAuthenciated, isSavedLoaded, layout_type, layout_id]);
};

export default useLoadSavedData;
