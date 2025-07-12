import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import LoaderAnimation from "./Loader/LoaderAnimation";
import Nav from "../Pages/App/Components/Nav";
import Footer from "../Pages/App/Components/Footer";

import { LoaderProvider } from "../Pages/App/context/Loader/LoaderContext";

import { ForloadAbout,ForloadHome,ForloadQuiz,ForloadCourse } from "../assets";



const AppLayout = () => {
    const location = useLocation();
    const [ isLoading, setIsLoading ] = useState(true);
     const [preloadedImage, setPreloadedImages] = useState([]);
    const [animation, setAnimation] = useState("");
let imageArray;
if(location.pathname=="/"){
  imageArray=ForloadHome;
}
else if(location.pathname=="/courses"){
  imageArray=ForloadCourse;
}
else if(location.pathname=="/about"){
  imageArray=ForloadAbout;
}
else{
  imageArray=ForloadQuiz;
}
 useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = imageArray || []; 
      const loadedImages = [];


      const preload = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src); 
          img.onerror = reject; 
        });

      try {
        for (const src of imagesToLoad) {
          const loadedImage = await preload(src);
          loadedImages.push(loadedImage);
        }
        setPreloadedImages(loadedImages);
      } catch (error) {
        console.error("Error preloading images:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (isLoading) {
      preloadImages();
    }
  }, [ isLoading, setPreloadedImages]);


    useEffect(() => {
        if (location.state && location.state.action === "loading") {
            setAnimation("");
            setIsLoading(true);
        }
    }, [location, setIsLoading]);

  // const [isLoading, setIsLoading] = useState(true);
  // const [animation, setAnimation] = useState("");

  // useEffect(() => {
   
  //   const loadStaticTimeout = setTimeout(() => {
  //     setAnimation("animationStart");
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(loadStaticTimeout); 
  // }, []);

  useEffect(() => {
    
    if (location.state && location.state.action === "loading") {
      setAnimation("");
      setIsLoading(true);
      
      const loadStaticTimeout = setTimeout(() => {
        setAnimation("animationStart");
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(loadStaticTimeout); 
    }
  }, [location]);

    return (
        <>
 
 <LoaderProvider value={{isLoading:isLoading,setIsLoading:setIsLoading,preloadedImage:preloadedImage}} >

            <main
                style={{
                    overflowY: isLoading ? "hidden" : "auto",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                }}
                className={animation}
            >
                {isLoading && <LoaderAnimation />}
                {!isLoading && (
                    <>
                        <Nav />
                       
                        <Outlet setIsLoading={setIsLoading}/>
                        <Footer />
                    </>
                )}
            </main>
</LoaderProvider>
    
        </>
    );
};

export default AppLayout;
