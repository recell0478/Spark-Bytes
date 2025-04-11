import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

/**
 * Redirects to a given path if the user is already authenticated.
 * @param redirectTo The route to redirect to if user is logged in (default is "/profile")
 */
const useRedirectIfAuthenticated = (redirectTo: string = "/profile") => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        navigate(redirectTo);
      }
    };

    checkSession();
  }, [navigate, redirectTo]);
};

export default useRedirectIfAuthenticated;
