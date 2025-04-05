import axios from "axios";
import { Cookies } from "quasar";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export const axiosGraphQL = axios.create({
  baseURL: import.meta.env.VITE_GraphQL_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBlogPosts = async () => {
  const response = await axiosAPI.get("posts/");
  return response.data;
};

export const getUserFavoritePosts = async () => {
  const response = await axiosAPI.get("favorite-posts/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  });
  return response.data;
};

export const getUserPosts = async () => {
  const response = await axiosAPI.get("user-posts/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  });
  return response.data;
};

export const getPostById = async (slug) => {
  const response = await axiosAPI.get("posts/" + slug);
  return response.data;
};

export const getAllTags = async () => {
  const response = await axiosAPI.get("tags/");
  return response.data;
};

export const getTagById = async (id) => {
  const response = await axiosAPI.get("tags/" + id);
  return response.data;
};

export const getAllComments = async () => {
  const response = await axiosAPI.get("comments/");
  return response.data;
};

export const getCommentById = async (id) => {
  const response = await axiosAPI.get("comments/" + id);
  return response.data;
};

export const createPost = async (post) => {
  const response = await axiosAPI.post("posts/", post);
  return response.data;
};

export const deletePost = async (slug) => {
  await axiosAPI.delete("/posts/" + slug);
};

export const deleteComment = async (id) => {
  await axiosAPI.delete("/comments/" + id);
};

export const createTag = async (tag) => {
  const response = await axiosAPI.post("tags/", tag);
  return response.data;
};

export const searchPost = async (title) => {
  const response = await axiosAPI.get("/posts/?title=" + title);
  return response.data;
};

export const addPostToFavorites = async (id) => {
  const response = await axiosAPI.post("/favorite-post/", { id });
  return response.data;
};

export const likePost = async (id) => {
  const response = await axiosAPI.post("/like-post/", { id });
  return response.data;
};

export const getUserFavoritePostList = async () => {
  const response = await axiosGraphQL(
    "/graphql/",
    {},
    {
      data: {
        query: `
                query {
                    userFavoritePosts {
                    title
                    slug
                    author {
                        username
                    }
                    content
                    tag {
                        id
                        name
                    }
                    publishedAt
                    updatedAt
                    slug
                    favorites {
                        username
                    }
                    comments {
                        user {
                        username
                        }
                        comment
                    }
                    }
                }
            `,
      },
    }
  );
  return response.data;
};
