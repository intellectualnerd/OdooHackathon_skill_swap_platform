
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
        console.log(session,session,"user")
        const { data, error } = await supabase
          .from("user_profile")
          .select("*")
          .eq("user_id", session.session.user.id)
          .single();
        isLoggedIn.current = true
        // dispatch(login({ user: session.session.user, session: session.session, profile: data }))
        dispatch(login({ user: session.session.user, session: session.session,profile:data }))

      }
    }
    checkSession();

    const { data: subscribe } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (!isLoggedIn) {

          const { data, error } = await supabase
            .from("user_profile")
            .select("*")
            .eq("user_id", session.session.user.id)
            .single();
          dispatch(login({ user: session.user, session, profile: data }))
          // dispatch(login({ user: session.user, session }))

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