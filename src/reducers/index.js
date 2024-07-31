import { combineReducers } from "redux";
import BlogPost from "../enums/BlogPost.enum.ts";
import { BlogPostService } from "../services/blogPost.service";

// Reducers
const initialState = {
  posts: { result: [], next: false },
};

const postsReducer = async (state = initialState, action) => {
  switch (action.type) {
    case BlogPost.LOAD:
      // (async () => {
      const _BlogPostService = BlogPostService.getInstance();
      const { result, next } = await _BlogPostService.get();
      return { ...state, posts: { result, next } };
    // })();
    case BlogPost.DELETE:
      const diff = state.counter - 1;
      localStorage.setItem("counter", diff);
      return { ...state, counter: diff };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
