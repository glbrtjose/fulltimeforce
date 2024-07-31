import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import store from "../../store/store";
import State from "../../enums/State.enum";
// import { BlogPostService } from "@/src/services/blogPost.service";
import BlogPost from "../../enums/BlogPost.enum";
import { BlogPostService } from "../../services/blogPost.service";
import "./List.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

export const List = () => {
  const postState: any = useSelector(({ counter, posts }: any) => posts);
  const _BlogPostService = BlogPostService.getInstance();
  const [posts, setposts] = useState([]);
  const [state, setstate] = useState(State.LOADING);
  useEffect(() => {
    // @ts-ignore
    // store.dispatch({ type: BlogPost.LOAD });
    (async () => {
      const { result, next }: any = await _BlogPostService.get();
      setposts(() => result);
      setstate(() => (result?.length > 0 ? State.COMPLETE : State.EMPTY));
    })();
  }, []);
  return (
    <div className="container">
      <div className="top-icon">
        <FontAwesomeIcon className="add" icon={faPlusCircle} />
      </div>
      <div className="grid">
        {posts?.map(
          ({ _id, title, content, author, createdAt, updatedAt }: any) => (
            <div key={_id} className="container">
              <div className="icon-container">
                <div className="icon">
                  <FontAwesomeIcon className="edit" icon={faPencil} />
                  <FontAwesomeIcon
                    className="delete"
                    icon={faTrash}
                    onClick={async () => {
                      // store.dispatch({ type: BlogPost.DELETE });
                      console.log("_id: ", _id);
                      const { result, next }: any =
                        await _BlogPostService.delete(_id);
                    }}
                  />
                </div>
              </div>
              <p>title: {title}</p>
              <p>content: {content}</p>
              <p>author: {author}</p>
              <p>createdAt: {createdAt}</p>
              <p>updatedAt: {updatedAt}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
