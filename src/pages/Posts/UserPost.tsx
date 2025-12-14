import React, { useContext, useEffect, useState } from 'react'
import PostCard from './PostCard';
import ErrorPage from '../ErrorPage';
import PostCardSkelton from './PostCardSkelton';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { GrStatusGood } from 'react-icons/gr';
import DrawerCreatePost from './DrawerCreatePost';
import toast from 'react-hot-toast';

type post = {
  id:number,
  title:string,
  body:string
}

const UserPosts = () => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext)
  const [posts,setPosts]  = useState<post[]>([]) ;
  const [isloading,setIsloading] = useState(true);
  const [errors,setErrors] = useState(null);
  const [isDelete,setIsDelete]  = useState(false);

  const skelton = window.innerWidth<768 ? Array(2).fill(0) : Array(6).fill(0) ;

  useEffect(()=>{
    const getmypost = async () => {
      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
     const res = await toast.promise(fetch("/api/myposts",{
      headers:{
        Authorization:`Bearer ${token}`
      }
     }),{
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
    getmypost();
  },[token]);

  const handleDelete = async (id:number) => {
    const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
        const res = await toast.promise(fetch(`/api/posts/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          },
          method:"DELETE"
        }),{
          loading:"Deleting post ...",
          error:"Serveur : erreur coté serveur"
        } );
        clearTimeout(timeoutId);
        const data = res.json();
        if(!res.ok){
          setErrors(data.errors);
        }else{
           setIsDelete(true);
           toast.success("post deleted ❌ successffuly")
           setIsDelete(false);
           setPosts([]);
        }
  }

  const handleEdit = (id:number) => {
        navigate(`/posts/update/${id}`) ;
  };

  return (
    <div className='flex justify-center items-center w-full'>
            <div className='fixed z-2 right-5 md:right-2 md:top-35 top-53'><DrawerCreatePost/></div>
      {isloading ? (<div className='w-full flex flex-col justify-center items-center  '>
       <h1 className=' w-fulll font-semibold text-xl text-info'><span className="loading loading-dots loading-lg text-info dark:text-cyan"></span>Loading</h1>
        <div className='grid grid-cols-1 md:grid-cols-3  mt-4 mx-auto '>
            {  skelton.map((_,index)=>
                    (<div key={index}><PostCardSkelton/></div>)
            )  }
      </div>
      </div> ) : (
       <div className='w-full flex flex-col justify-center items-center  '>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4  '>
            {  posts.map((post,index)=>
                    (<div key={index}><PostCard title={post.title} body={post.body} deletePost={()=>handleDelete(post.id)} editPost={()=>handleEdit(post.id)} isdeleted={isDelete}/></div>)
            )  }
      </div>
      </div>)
}     
    </div>
  )
}

export default UserPosts
