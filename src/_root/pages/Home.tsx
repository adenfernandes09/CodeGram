import { Models } from "appwrite";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";

const Home = () => {
  const{data: posts, isPending: isPostLoading, isError: isErrorPost} = useGetRecentPosts();
  if(!posts){
    console.log("Data doesn't exist here");
  }else {
    console.log("Posts Data is present")
  }

  return (
   <div className="flex flex-1">
     <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard key={post.caption} post={post} />
                  {/* <p>{post.caption}</p> */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
   </div> 
  )
}

export default Home