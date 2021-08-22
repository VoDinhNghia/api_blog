const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { CountNumAccount } = require('../database/QuerryData');
const ErrorCode = require('../error/ErrorCode');

let NotyfyMessage = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let NumMessage = await db.CountNumAccount('Message', { IdUserGet: InfoUser[0].ID, StatusMess: 0 });
            return res.status(200).json({
                status: true,
                code: 0,
                data: NumMessage[0].count
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}
let NotifyShareLikeComment = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = []
            let NumSLC = await db.SelectDataJoin3Table('user', 'listPost', 'shareLikeComment', 'user.ID', 'listPost.IDuser',
                'listPost.ID', 'shareLikeComment.IDpost', ArrayCollunm, { 'user.ID': InfoUser[0].ID, 'shareLikeComment.StatusNotify': 0 }, {
                    'shareLikeComment.IDuser': InfoUser[0].ID
                });
            return res.status(200).json({
                status: true,
                code: 0,
                data: NumSLC.length
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListShareLikeComment = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Email', 'user.Mobile', 'user.Gender', 'user.Status', 'user.CreateAt',
                'user.DateUpdate', 'user.Avatar', 'user.Country', 'listPost.ID', 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost',
                'shareLikeComment.ID', 'shareLikeComment.IDpost', 'shareLikeComment.IDuser', 'shareLikeComment.Comment', 'shareLikeComment.Type',
                'shareLikeComment.StatusNotify', 'shareLikeComment.DateAction'
            ]
            let ArraySLC = await db.SelectDataJoin3Table('user', 'listPost', 'shareLikeComment', 'user.ID', 'listPost.IDuser',
                'listPost.ID', 'shareLikeComment.IDpost', ArrayCollunm, { 'user.ID': InfoUser[0].ID, 'shareLikeComment.StatusNotify': 0 }, {
                    'shareLikeComment.IDuser': InfoUser[0].ID
                });
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArraySLC
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ReadNotify = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let InfoSLC = await db.SelectData('shareLikeComment', ArrayCollunm, {
                    ID: req.params.id
                }, '');
                if (InfoSLC.length > 0) {
                    let updateStatus = await db.UpdateData('shareLikeComment', { ID: req.params.id }, {
                        StatusNotify: 1
                    })
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Success."
                    });
                } else {
                    return ErrorCode.Error_523(req, res)
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

module.exports = {
    NotyfyMessage: NotyfyMessage,
    NotifyShareLikeComment: NotifyShareLikeComment,
    ReadNotify: ReadNotify,
    ListShareLikeComment: ListShareLikeComment
}