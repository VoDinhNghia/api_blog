const upload = require('./UploadFile');
const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const fs = require('fs');
const { CountNumAccount } = require('../database/QuerryData');
const ErrorCode = require('../error/ErrorCode');
const { Error_500 } = require('../error/ErrorCode');
const crypto = require('./Crypto');

let NewPost = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                if (req.body.Privacy == 'private') { Privacy = 1 } else { Privacy = 0 }
                let checkTitlePost = crypto.ReplaceCharScriptFromForm(req.body.TitlePost);
                let checkContent = crypto.ReplaceCharScriptFromForm(req.body.ContentPost);
                let SavePost = await db.InsertData('listPost', {
                    IDuser: InfoUser[0].ID,
                    TitlePost: checkTitlePost || 'Not title',
                    Content: checkContent || '',
                    Image: req.body.FileImage || '',
                    Privacy: req.body.Privacy || 0,
                    DatePost: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "post success."
                });

            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let EditPost = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let InfoPost = await db.SelectData('listPost', ArrayCollunmSelect, {
                ID: req.body.IdPost,
                IDuser: InfoUser[0].ID
            }, "");
            if (InfoPost.length > 0) {
                let checkTitlePost = crypto.ReplaceCharScriptFromForm(req.body.TitlePost);
                let checkContent = crypto.ReplaceCharScriptFromForm(req.body.ContentPost);
                let UpdatePost = await db.UpdateData('listPost', { ID: InfoPost[0].ID }, {
                    TitlePost: checkTitlePost || InfoPost[0].TitlePost,
                    Content: checkContent || InfoPost[0].Content,
                    Image: req.body.FileImage || InfoPost[0].Image,
                    Privacy: req.body.Privacy
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Edit post success."
                });
            } else {
                return ErrorCode.Error_514(req, res)
            }
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        console.log(error);
        return ErrorCode.Error_500(req, res)
    }
}

let ShareLikeComment = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        let ArrayCollunm = [
            'user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "shareLikeComment.ID", 'shareLikeComment.IDuser', 'shareLikeComment.IDpost',
            'shareLikeComment.Comment', 'shareLikeComment.Type', 'shareLikeComment.StatusLike', 'shareLikeComment.StatusNotify', 'shareLikeComment.DateAction'
        ]
        let DataShareLikeComment = await db.SelectDataJoin2Table('user', 'shareLikeComment', 'user.ID', 'shareLikeComment.IDuser', ArrayCollunm, {
            'shareLikeComment.StatusLike': 0
        })
        if (InfoUser.length > 0) {
            return res.status(200).json({
                status: true,
                code: 0,
                data: DataShareLikeComment
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let LikePost = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let CheckLike = await db.SelectData('shareLikeComment', ArrayCollunm, {
                    IDpost: req.params.id,
                    IDuser: InfoUser[0].ID,
                    Type: 0 //0 like, 1 comment, 2 share
                }, "");
                if (CheckLike.length > 0) {
                    if (CheckLike[0].StatusLike == 0) {
                        let UpdateData = await db.UpdateData('shareLikeComment', {
                            IDpost: req.params.id,
                            IDuser: InfoUser[0].ID,
                            Type: 0
                        }, { StatusLike: 1 }); //0 like, 1 unlike
                    } else {
                        let UpdateData = await db.UpdateData('shareLikeComment', {
                            IDpost: req.params.id,
                            IDuser: InfoUser[0].ID,
                            Type: 0
                        }, { StatusLike: 0 });
                    }
                } else {
                    let InsertData = await db.InsertData('shareLikeComment', {
                        IDpost: req.params.id,
                        IDuser: InfoUser[0].ID,
                        Comment: 'like',
                        Type: 0,
                        StatusLike: 0,
                        StatusNotify: 0,
                        DateAction: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                    });
                }
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Like success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {
        console.log(error);
        return ErrorCode.Error_500(req, res)
    }
}

let CommentPost = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let checkComment = crypto.ReplaceCharScriptFromForm(req.body.Comment);
                let InsertData = await db.InsertData('shareLikeComment', {
                    IDpost: req.body.IdPost,
                    IDuser: InfoUser[0].ID,
                    Comment: checkComment,
                    Type: 1,
                    StatusLike: 0,
                    StatusNotify: 0,
                    DateAction: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Comment success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeletePost = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let selectPost = await db.SelectData('listPost', ArrayCollunm, { ID: req.params.id, IDuser: InfoUser[0].ID }, "");
                if (selectPost.length > 0) {
                    let delShareLikeComment = await db.DeleteData('shareLikeComment', {
                        IDpost: req.params.id
                    });
                    let delPost = await db.DeleteData('listPost', { ID: req.params.id, IDuser: InfoUser[0].ID });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Delete post success."
                    })
                } else {
                    return ErrorCode.Error_516(req, res)
                }
            } else {
                return ErrorCode.Error_505(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}


let ListTenNewPost = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Avatar', 'user.Status', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost']
        let ListTenNewPost = await db.SelectLimit('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
            'listPost.Privacy': 0
        }, 10, 0, 'listPost.ID', 'DESC');
        if (InfoUser.length > 0) {
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListTenNewPost
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAllPost = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        let CountNumAllPost = await db.CountNumAccount('listPost', { Privacy: 0 })
        let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost']
        let ListAllPosts = await db.SelectLimit('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
            'listPost.Privacy': 0
        }, parseInt(CountNumAllPost), 0, 'listPost.ID', 'DESC');
        if (InfoUser.length > 0) {
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListAllPosts
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListPostOfMe = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost']
            let ListAllPosts = await db.SelectDataJoin2Table('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                'listPost.IDuser': InfoUser[0].ID
            })
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListAllPosts
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        console.log(error);
        return ErrorCode.Error_500(req, res)
    }
}

let ListPostOfuser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost']
                let ListAllPosts = await db.SelectDataJoin2Table('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                    'listPost.Privacy': 0,
                    'user.ID': req.params.id
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: ListAllPosts
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let PaginationPage = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false || parseInt(req.params.id) != 0) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            let page = parseInt(req.params.id);
            let numPerPage = 10;
            let skip = (page - 1) * numPerPage;
            let limit = numPerPage;
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost']
            let ListAllPost = await db.SelectLimit('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                'listPost.Privacy': 0
            }, limit, skip, 'listPost.ID', 'DESC');
            if (InfoUser.length > 0) {
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: ListAllPost
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {

        return ErrorCode.Error_500(req, res)
    }
}

let InfoPost = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost'];
                let InfopostOfme = await db.SelectData('listPost', [], {
                    'listPost.ID': req.params.id,
                    'listPost.IDuser': InfoUser[0].ID
                }, '')
                if (InfopostOfme.length > 0) {
                    let DataPost = await db.SelectDataJoin2Table("user", "listPost", 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                        'listPost.ID': req.params.id
                    });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: DataPost
                    });
                } else {
                    let DataPost = await db.SelectDataJoin2Table("user", "listPost", 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                        'listPost.ID': req.params.id,
                        'listPost.Privacy': 0
                    });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: DataPost
                    });
                }
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: DataPost
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    NewPost: NewPost,
    ListTenNewPost: ListTenNewPost,
    EditPost: EditPost,
    PaginationPage: PaginationPage,
    ListAllPost: ListAllPost,
    ShareLikeComment: ShareLikeComment,
    InfoPost: InfoPost,
    LikePost: LikePost,
    CommentPost: CommentPost,
    DeletePost: DeletePost,
    ListPostOfuser: ListPostOfuser,
    ListPostOfMe: ListPostOfMe
}