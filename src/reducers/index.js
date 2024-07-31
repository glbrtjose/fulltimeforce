import { combineReducers } from "redux";
import BlogPost from "../enums/BlogPost.enum.ts";
import { BlogPostService } from "../services/blogPost.service";

// Reducers
const initialState = {
  posts: { result: [], next: false },
};

const postsReducer = async (state = initialState, action) => {
  switch (action.type) {
    case BlogPost.DELETE:
      const _BlogPostService = BlogPostService.getInstance();
      const data = await _BlogPostService.delete(action.id);
      const diff = state.counter - 1;
      localStorage.setItem("counter", diff);
      return { ...state };
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
