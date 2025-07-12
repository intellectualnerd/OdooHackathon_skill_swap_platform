import { createContext, useContext, useState } from "react";


const LoaderContext = createContext({
    isLoading:null,
    setIsLoading:()=>{},
    preloadedImage:null,
     setPreloadedImage:()=>{},
});
export const LoaderProvider=LoaderContext.Provider

export const useLoader = () => useContext(LoaderContext);

