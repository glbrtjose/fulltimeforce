import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import store from "../../store/store";
import { BlogPostService } from "../../services/blogPost.service";
import State from "../../enums/State.enum";

export const List = () => {
  const counter = useSelector(({ counter }: any) => counter);
  const _BlogPostService = BlogPostService.getInstance();
  const [posts, setposts] = useState([]);
  const [state, setstate] = useState(State.LOADING);
  useEffect(() => {
    (async () => {
      const { result, next }: any = await _BlogPostService.get();
      setposts(() => result);
      setstate(() => (result?.length > 0 ? State.COMPLETE : State.EMPTY));
    })();
  }, []);
  return (
    <div>
      <p className="counter_title">Counter: {counter.counter}</p>
      {posts.map(({ _id, title, content, author, createdAt, updatedAt }) => (
        <div key={_id}>
          <p>{title}</p>
          <p>{content}</p>
          <p>{author}</p>
          <p>{createdAt}</p>
          <p>{updatedAt}</p>
        </div>
      ))}
    </div>
  );
};
