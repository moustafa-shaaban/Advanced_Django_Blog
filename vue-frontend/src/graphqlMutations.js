export const createPostMutation = `
    mutation CreatePost($title: String, $content: String, $tags: [Int]!) {
        createPost(input: {title: $title, content: $content, tags: $tags}) {
            post {
                id
                title
                content
                tag {
                    name
                }
            }
        }
    }
`;

export const updatePostMutation = `
    mutation UpdatePost($id: Int!, $title: String, $content: String, $tags: [Int]!) {
        updatePost(id: $id, input: {title: $title, content: $content, tags: $tags}) {
            post {
                id
                title
                content
                tag {
                    name
                }
            }
        }
    }
`;

export const deletePostMutation = `
    mutation deletePost($id: Int!) {
        deletePost(id: $id) {
            success
        }
    }
`;

export const addPostToUserFavoritesMutation = `
    mutation addPostToUserFavorites($id: Int!) {
        addPostToUserFavorites(id: $id) {
            success
        }
    }
`;

export const likePostMutation = `
    mutation likePost($id: Int!) {
        likePost(id: $id) {
            success
        }
    }
`;

export const createTagMutation = `
    mutation createTag($name: String!) {
        createTag(input: {name: $name}) {
            errors {
                messages
                field
            }
            tag {
                id
                name
            }
        }
    }
`;

export const createCommentMutation = `
    mutation CreateComment($slug: String!, $comment: String!) {
        createComment(inputs: {
            postSlug: $slug, 
            comment: $comment, 
        }) {
            success
        }
    }
`;

export const deleteCommentMutation = `
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id) {
            success
        }
    }
`;

export const updateCommentMutation = `
    mutation updateComment($id: Int!, $comment: String!) {
        updateComment(id: $id, comment: $comment) {
        success
        }
    }
`;
