import React, { useEffect, useState } from 'react'
import Create from './CreatePost';
import PostCard from './PostCard';
import ErrorPage from '../ErrorPage';
import { Divide } from 'lucide-react';
import PostCardSkelton from './PostCardSkelton';
import DrawerCreatePost from './DrawerCreatePost';
import toast from 'react-hot-toast';

type post = {
  title:string,
  body:string
}
const Posts = () => {
  const [posts,setPosts]  = useState<post[]>([]) ;
  const [isloading,setIsloading] = useState(true);
  const skelton = window.innerWidth<768 ? Array(2).fill(0) : Array(6).fill(0) ;
  useEffect(()=>{
    const getpost = async () => {

      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
     
     const res = await toast.promise(fetch("/api/posts"),{
       loading:"Chargement des posts ...",
       error:"Serveur : erreur cote serverveur"
     });
     clearTimeout(timeoutId);
    const data = await res.json();
    if(!res.ok){
      setIsloading(false);
    }else{
         setPosts(data);
         setIsloading(false);
    }
    }
    getpost();
  },[])
  return (
    <div className='flex justify-center items-center w-full '>
      <div className='fixed z-2 right-1 md:right-2 hover:translate-y-1 md:top-35 top-53'><DrawerCreatePost/></div>
      {isloading ? (<div className='w-full  flex flex-col justify-center items-center  mx-auto '>
       <h1 className=' font-semibold text-xl text-info'><span className="loading loading-dots loading-lg text-info dark:text-cyan-500 "></span>Loading</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2  mt-4 md:mx-auto'>
            {  skelton.map((_,index)=>
                    (<div key={index}><PostCardSkelton/></div>)
            )  }
      </div>
      </div> ) : (
       <div className='w-full flex flex-col justify-center items-center mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2  mt-4  md:mx-auto '>
            {  posts.map((post,index)=>
                    (<div key={index}><PostCard title={post.title} body={post.body}/></div>)
            )  }
      </div>
      </div>)
}
    </div>
  )
}

export default Posts
