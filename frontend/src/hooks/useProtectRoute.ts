import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

/**
 * Protects a page by redirecting to a fallback route if the user is not authenticated.
 * @param redirectTo The route to redirect to if user is NOT logged in (default is "/signin")
 */
const useProtectRoute = (redirectTo: string = "/signin") => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        navigate(redirectTo);
      } else {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [navigate, redirectTo]);

  return checkingAuth;
};

export default useProtectRoute;
