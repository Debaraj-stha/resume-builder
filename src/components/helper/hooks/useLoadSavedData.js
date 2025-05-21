import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLayout } from "../../../provider/layoutProvider";
import { useSupabase } from "../../../provider/supabaseProvider";
import { useAuth } from "../../../provider/AuthProvider";

const useLoadSavedData = () => {
  const { layout_type, layout_id } = useParams();
  const { user } = useAuth();
  const { isSavedLoaded, setSavedData, setIsSavedLoaded } = useLayout();
  const { getSavedData } = useSupabase();

  useEffect(() => {
    if (!user || isSavedLoaded) return;

    (async () => {
      const data = await getSavedData({ layout_type, layout_id });
      console.log("Saved data:", data);
      setSavedData(data);
      setIsSavedLoaded(true);
    })();
  }, [user, isSavedLoaded, layout_type, layout_id]);
};

export default useLoadSavedData;
