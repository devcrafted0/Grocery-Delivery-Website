"use client";
import { useAppContext } from "@/context/AppContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Data = {
    name : string;
    email : string;
    password : string;
    state : string;
}

const Login = () => {
  const [state, setState] = useState("login");
  const {setShowUserLogin} = useAppContext();

  // state for input value
  const [data, setData] = useState<Data>({
    name: "",
    email: "",
    password: "",
    state : state,
  });

  // handle change input value
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ 
            ...prev,
            [e.target.name]: e.target.value,       
            state: state === "login" ? "login" : "register",
        }));    
  };

  useEffect(()=>{
    console.log(data);
  }, [data])

  // handle submit form
  const handleSubmit = (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return( 
    <div onClick={()=>setShowUserLogin(false)} className="w-full h-full flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50">
        <div>
        <form
                onSubmit={handleSubmit}
                onClick={(e)=>e.stopPropagation()}
                className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
            >
                <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Register"}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
                    Please {state === "login" ? "sign in" : "sign up"} to continue
                </p>

                {state !== "login" && (
                    <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        {/* User Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                            <path d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <input type="text" placeholder="Name" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="name" value={data.name} onChange={onChangeHandler} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    {/* Mail Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input type="email" placeholder="Email id" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="email" value={data.email} onChange={onChangeHandler} required />
                </div>

                <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    {/* Lock Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input type="password" placeholder="Password" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="password" value={data.password} onChange={onChangeHandler} required />
                </div>

                <div className="mt-5 text-left">
                    <a className="text-sm text-primary dark:text-primary" href="#" >
                        Forgot password?
                    </a>
                </div>

                <button type="submit" className="cursor-pointer mt-2 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity" >
                    {state === "login" ? "Login" : "Create Account"}
                </button>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
                    {state === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button type="button" className="text-primary dark:text-primary cursor-pointer" onClick={() => setState((prev) => prev === "login" ? "register" : "login")} >
                        {state === "login" ? "Register" : "Login"}
                    </button>
                </p>
        </form>
        </div>
    </div>
  )
};

export default Login;
