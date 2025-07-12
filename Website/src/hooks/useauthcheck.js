
import { useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

import { login, logout } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function usecheckAuth() {

  const dispatch = useDispatch()
  const isLoggedIn = useRef(false)
  useEffect(() => {

    const checkSession = async () => {

      const { data: session } = await supabase.auth.getSession();

      if (session && session.session) {
        // console.log(session,session,"user")
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.session.user.id)
          .single();

        isLoggedIn.current = true
        dispatch(login({ user: session.session.user, session: session.session, profile: data }))
      }
    }
    checkSession();

    const { data: subscribe } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (!isLoggedIn) {
      console.log(event, "user", session)

          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.session.user.id)
            .single();
          dispatch(login({ user: session.user, session, profile: data }))
        }
    isLoggedIn.current=true

      }
      else {
        dispatch(logout())
    isLoggedIn.current=false

      }
    })

    return () => {
      subscribe.unsubscribe();
    }
  }, [])

}