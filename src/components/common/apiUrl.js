var blogHost = 'http://127.0.0.1:8011';
var newsHost = 'http://127.0.0.1:8012';
var postHost = 'http://127.0.0.1:8013';
var userHost = 'http://127.0.0.1:8014';
var categoryHost = 'http://127.0.0.1:8015';

export default {
      getBlogList: {url: blogHost + '/blog/blogList'}    //获取博客列表
    , getBlogCollectionList: {url: blogHost + '/blog/collectionList'}        //获取博客收藏列表
    , deleteCollection: {url: blogHost + '/blog/deleteCollection'}                       //删除博客收藏
    , getBlogCommentList: {url: blogHost + '/blog/commentList'}                      //获取角色
    , deleteBlogComment: {url: blogHost + '/blog/deleteComment'}
    , getCategoryList: {url: categoryHost + '/category/categoryList'}
    , updateBlog: {url: blogHost + '/blog/updateBlog'}
    , deleteBlog: {url: blogHost + '/blog/deleteBlog'}

    , updateNews: {url: newsHost + '/news/updateNews'}
    , deleteNews: {url: newsHost + '/news/deleteNews'}
    , getNewsList: {url: newsHost + '/news/newsList'}
    , getNewsCommentList: {url: newsHost + '/news/commentList'}
    , deleteNewsComment: {url: newsHost + '/news/deleteComment'}

    , updatePost: {url: postHost + '/post/updatePost'}
    , deletePost: {url: postHost + '/post/deletePost'}
    , getPostList: {url: postHost + '/post/postList'}
    , getPostCommentList: {url: postHost + '/post/commentList'}
    , deletePostComment: {url: postHost + '/post/deleteComment'}

    , addUser: {url: userHost + '/user/addUser'}
    , updateUser: {url: userHost + '/user/updateUser'}
    , deleteUser: {url: userHost + '/user/deleteUser'}
    , getUserList: {url: userHost + '/user/userList'}

    , addCategory: {url: categoryHost + '/category/addCategory'}
    , updateCategory: {url: categoryHost + '/category/updateCategory'}
    , deleteCategory: {url: categoryHost + '/category/deleteCategory'}
    , getCategoryListByPage: {url: categoryHost + '/category/categoryListByPage'}
    // , deleteComment: {url: blogHost + '/blog/deleteComment'}
}
