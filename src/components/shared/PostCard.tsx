import { Models } from "appwrite"
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({post}: PostCardProps) => {
    const {user} = useUserContext();
    if (!post.creator) return;

  return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="Creator" className="rounded-full w-12 md:h-12"/>
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                        <div className="flex-center text-light-3 gap-2">
                            <p className="subtle-semibold">
                                {formatDateString(post.$createdAt)}
                            </p>
                            <p className="subtle-semibold lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>

                <Link to={`/update-posts/${post.$id}`} className={`${user.id === post.creator.$id && "hidden"}`}>
                    <img src="/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`}>
                    <div className="small-medium lg:base-medium py-5 flex-col">
                        <p>{post.caption}</p>
                        <ul className="flex gap-1 mt-2">
                            {post.tags.map((tag: string) => (
                                <li key={tag} className="text-light-3">
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                        <img src={post.imageUrl || '/assets/icons/profile-placeholder.svg'} alt='Post' className="post-card_img"  />
                    </div>
                </Link>

                <PostStats post={post} userId={user.id} />
        </div>
    )
}

export default PostCard