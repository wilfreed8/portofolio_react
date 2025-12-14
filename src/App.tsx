import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css" ;
import Todo from "./pages/projets/Todo";
import Posts from "./pages/Posts/Posts";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Home from "./pages/Home";
import UnAuthenticated from "./pages/UnAuthenticated";
import CreatePost from "./pages/Posts/CreatePost";
import UserPost from "./pages/Posts/UserPost";
import UpdatePost from "./pages/Posts/UpdatePost";
import ProjetDashboard from "./pages/projets/ProjetDashboard";



import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import GamesDashboard from "./pages/projets/games/GamesDashboard";
import Crash from "./pages/projets/games/Crash";
import { CurrencyConverter } from "./pages/projets/games/CurrencyConverter";
import { TicToe } from "./pages/projets/games/TicToe";
import Navbar from "./components/Navbar";
import Chatbot from "./pages/projets/Chatbot";
import PostsDashboard from "./pages/Posts/PostsDashboard";
import Emails from "./pages/projets/Emails/emails";
import ErrorPage from "./pages/ErrorPage";

gsap.registerPlugin(useGSAP,ScrollTrigger,SplitText);
const App = () => {
  const {user} = useContext(AppContext);
  const isMe = user?.email=="hackman@gmail.com"
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Navbar/>}>
    <Route index element={<Home/>}/>
    <Route path="/register" element={user ? <Home/>:<Register/>}/>
    <Route path="/login" element={user ? <Home/>:<Login/>}/>
    <Route path="/projets" element={!user ? <UnAuthenticated/>:<ProjetDashboard/>} >
      <Route index  element={<Todo/>}/>
      <Route path="/projets/chatbot" element={<Chatbot/>}/>
      {isMe &&
      <Route path="/projets/myemails" element={<Emails/>}/>
      }
      <Route path="/projets/games"  element={<GamesDashboard/>}>
      <Route index element={<Crash/>}></Route>
      <Route path="/projets/games/crash" element={<Crash/>}></Route>
      <Route path="/projets/games/currency-converter" element={<CurrencyConverter/>}></Route>
      <Route path="/projets/games/tic-tac-toe" element={<TicToe/>}></Route>
      </Route>
    </Route>
    <Route path="/posts" element={!user ? <UnAuthenticated/>:<PostsDashboard/>} >
    <Route index element={<Posts/>}/>
    <Route path="/posts/myPosts" element={<UserPost/>}/>
    <Route path="/posts/create_Post" element={<CreatePost/>}/>
    <Route path="/posts/update/:id" element={<UpdatePost/>}/>
    </Route>
    </Route>
    <Route path="*" element={<ErrorPage/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
