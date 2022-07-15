import { signOut } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase';


const AuthContext = createContext({});


export const AuthProvider = ({children}) => {

const [error, setError] = useState(null)
const [user, setUser] = useState(null);
const [loadingInitial, setLoadingInitial] = useState(true);
const [loading, setLoading] = useState(false)
const [name, setName] = useState(null);
const [job, setJob] = useState(null);
const [age, setAge] = useState(null);
const [choice, setChoice] = useState("Unknown"); 
const [imageUrl, setimageUrl] = useState("");
const [refresh, setRefresh] = useState(false);




useEffect(
	() =>
    auth.onAuthStateChanged( user => {
      if (user) {
        setUser(user);
		console.log(`user.uid : ${user.uid}`)
      } else {
		setUser(null);
	  }
	  setLoadingInitial(false);
    }),
  []
  );


  const logout = () => {
	setLoading(true);
	signOut(auth).catch(error => setError(error)).finally(() => setLoading(false))
  }

  const handleSignUp = (email, password) => {
	  setLoading(true);
	   auth
	   .createUserWithEmailAndPassword(email, password)
		.catch(error => alert(error.message))
		.finally(() => setLoading(false))
	}

  const handleLogin = (email, password) => {
	setLoading(true);
	   auth
	   .signInWithEmailAndPassword(email, password)
	   .catch(error => alert(error.message))
		.finally(() => setLoading(false));
	}

	const memoedValue = useMemo(() => ({
		user,
		loading,
		error,
		name,
		job,
		age,
		choice,
		imageUrl,
		refresh,
		handleSignUp,
		handleLogin,
		logout,
		setName,
		setJob,
		setAge,
		setChoice,
		setimageUrl,
		setRefresh
	}), [user, loading, error, name, job, age, choice, imageUrl, refresh])

  return (
	<AuthContext.Provider 
	value={memoedValue}
		>
	  {!loadingInitial && children}
	</AuthContext.Provider>
  )
};

export default function useAuth() {
	return useContext(AuthContext);
}