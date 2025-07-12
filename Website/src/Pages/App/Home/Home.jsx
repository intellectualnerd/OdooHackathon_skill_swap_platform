import { useSelector } from "react-redux";
const Home = () =>{
  const {profile,user}=useSelector(state=>state.auth)
  // console.log(profile,"jsj",user)
  return (<>
  <div className="bg-red-500">

  Home
  </div>
  
  </>)
}
export default Home;