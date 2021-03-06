const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controller/AuthController");
const UserController = require("../controller/UserController");
const UpdateProfile = require("../controller/UpdateProfile");
const PostController = require("../controller/PostController");
const SupportController = require("../controller/SupportController");
const NotifyController = require('../controller/NotifyCotroller');
const FollowController = require("../controller/FollowController");
const MessageCotroller = require("../controller/MessageController");
const SearchController = require("../controller/SearchController");
const StudyController = require("../controller/StudyController");
const AdminController = require("../controller/AdminController");
const ChangeBackground = require("../controller/ChangeBackground");

const swaggerJsdoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
const ListError = require("../error/ListError");

const SwaggerOptions = require("../document/Document");
const SwaggerDocs = swaggerJsdoc(SwaggerOptions.swagger_options);

let initAPIs = (app) => {
    app.use("/api-docs", SwaggerUI.serve);
    router.get("/api-docs", SwaggerUI.setup(SwaggerDocs, { explorer: true }));
    router.post("/api/auth/login", AuthController.login);
    router.get("/api/error", ListError.ListErr);
    router.post("/api/auth/register", AuthController.register);
    router.post("/api/getpass", SupportController.SendPassToMail);
    router.post("/api/refresh-token", AuthController.refreshToken);
    router.use(AuthMiddleWare.isAuth);
    router.get("/api/auth/me", UserController.me);
    router.get("/api/log/login", UserController.LogLogin);
    router.get("/api/list-user", UserController.ListAllUser);
    router.post("/api/contact", SupportController.SendContact);
    router.get("/api/info/:id", UserController.InfoOnceUser);
    router.put("/api/update/profile", UpdateProfile.UpdateProfile);
    router.post("/api/insert/avatar", UpdateProfile.InsertAvatar);
    router.get("/api/list/avatar/user/:id", UserController.ListAvatarOfUser);
    router.put("/api/update/change-password", UpdateProfile.ChangePass);
    router.post("/api/new/post", PostController.NewPost);
    router.post("/api/edit/post", PostController.EditPost);
    router.get("/api/list/ten-post", PostController.ListTenNewPost);
    router.get("/api/info-post/:id", PostController.InfoPost);
    router.delete("/api/delete/post/:id", PostController.DeletePost);
    router.get("/api/pagination-page/:id", PostController.PaginationPage);
    router.get("/api/list-post", PostController.ListAllPost);
    router.get("/api/data/sharelikecomment", PostController.ShareLikeComment);
    router.get("/api/like/post/:id", PostController.LikePost);
    router.post("/api/comment/post", PostController.CommentPost);
    router.get("/api/list/post/me", PostController.ListPostOfMe);
    router.get("/api/list/post/user/:id", PostController.ListPostOfuser);
    router.get("/api/notify/message", NotifyController.NotyfyMessage);
    router.get("/api/notify/sharelikecomment", NotifyController.NotifyShareLikeComment);
    router.get("/api/read/notify/:id", NotifyController.ReadNotify);
    router.get("/api/list/notify-slc", NotifyController.ListShareLikeComment);
    router.get("/api/update/avatar/:id", UpdateProfile.UpdateAvatar);
    router.delete("/api/delete/avatar/:id", UpdateProfile.DeleteAvatar);
    router.get("/api/list/avatar", UserController.ListAvatarOfMe);
    router.get('/api/follow/:id', FollowController.Follow);
    router.get("/api/check/follow/:id", FollowController.CheckFllow);
    router.delete("/api/delete/follow/:id", FollowController.RemoveFllow);
    router.get("/api/list/post/user-follow", FollowController.ListPostOfUserYouFllow);
    router.get("/api/list/me-follow", FollowController.ListUserMeFollow);
    router.get("/api/list/user/follow-me", FollowController.ListUserFllowMe);
    router.get("/api/message/unread", MessageCotroller.ListMessMeUnread);
    router.get("/api/message/read", MessageCotroller.ListMessMeReadAlredy);
    router.get("/api/list/mysend/unread", MessageCotroller.ListMeSendUnread);
    router.get("/api/list/message/get-send/:id", MessageCotroller.ListAllMessOfUser);
    router.get("/api/list/message/mygetfrom/:id", MessageCotroller.ListMessMeGet);
    router.get("/api/list/user/sendmess", MessageCotroller.ListAllUserMessToMe);
    router.post("/api/send/message", MessageCotroller.MySendMessage);
    router.post("/api/reply/message", MessageCotroller.MyReplyMessage);
    router.post("/api/search/user", SearchController.SearchUser);
    router.post("/api/search/post", SearchController.SearchPost);
    router.post("/api/search/post-personel", SearchController.SearchPostPersonel);
    router.post("/api/search/date", SearchController.seachDate);
    router.post("/api/create/topic", StudyController.CreateTopic);
    router.get("/api/list/topic", StudyController.ListTopicOfMe);
    router.post("/api/description/topic", StudyController.DescriptionTopic);
    router.delete("/api/delete/topic/:id", StudyController.DeleteTopic);
    router.delete("/api/destroy/topic/:id", StudyController.DestroyTopic);
    router.get("/api/recycle/topic-ofme", StudyController.RecycleTopic);
    router.get("/api/restore/topic/:id", StudyController.RestoreTopic);
    router.get("/api/list/problem/:id", StudyController.ListProblem);
    router.get("/api/info/topic/:id", StudyController.InfoTopic);
    router.post("/api/create/problem", StudyController.CreateProblem);
    router.get("/api/list/solution/:id", StudyController.ListSolution);
    router.get("/api/info/problem/:id", StudyController.InfoProblem);
    router.post("/api/create/solution", StudyController.CreateSolution);
    router.delete("/api/delete/solution/:id", StudyController.DeleteSolution);
    router.delete("/api/delete/problem/:id", StudyController.DeleteProblem);
    router.post("/api/add/schedule", StudyController.AddSchedule);
    router.get("/api/list/myschedule", StudyController.ListMySchedule);
    router.post("/api/edit/schedule", StudyController.EditSchedule);
    router.delete("/api/delete/schedule/:id", StudyController.DeleteSchedule);
    router.post("/api/auth/logout", AuthController.logout);
    router.put("/api/change/background", ChangeBackground.ChangeBackground);
    router.get("/api/get/background", ChangeBackground.GetBackground);
    router.get("/api/notify/contact", AdminController.NotifyContact);
    router.delete("/api/delete/account/user/:id", AdminController.DeleteAccountUser);
    router.delete("/api/delete/post-user/:id", AdminController.DeletePostUser);
    router.get("/api/block-user/:id", AdminController.BlockUser);
    return app.use("/", router);
}

module.exports = initAPIs;