const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { InsertData } = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');
const crypto = require("./Crypto");

let ListMessMeUnread = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let ColDistinct = ['Message.IdUserSend', 'user.ID', 'user.Avatar', 'user.Status', 'user.Name'];
            let ArrayMess = await db.SelectDistinct('user', 'Message', ColDistinct, ArrayCollunm, 'user.ID', 'Message.IdUserSend', {
                'Message.IdUserGet': InfoUser[0].ID,
                'Message.StatusMess': 0
            });
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArrayMess
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListMessMeReadAlredy = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let ColDistinct = ['Message.IdUserSend', 'user.ID', 'user.Avatar', 'user.Status', 'user.Name'];
            let ArrayMess = await db.SelectDistinct('user', 'Message', ColDistinct, ArrayCollunm, 'user.ID', 'Message.IdUserSend', {
                'Message.IdUserGet': InfoUser[0].ID,
                'Message.StatusMess': 1
            });
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArrayMess
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListMeSendUnread = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let ColDistinct = ['Message.IdUserSend', 'user.ID', 'user.Avatar', 'user.Status', 'user.Name'];
            let ArrayMess = await db.SelectDistinct('user', 'Message', ColDistinct, ArrayCollunm, 'user.ID', 'Message.IdUserSend', {
                'Message.IdUserSend': InfoUser[0].ID,
                'Message.StatusMess': 0
            });
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArrayMess
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAllMessOfUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Email', 'user.Gender', 'user.Mobile', 'user.Avatar', 'user.Status', 'user.Country',
                    'Message.IdUserSend', 'Message.IdUserGet', 'Message.ContentMess', 'Message.StatusMess', 'Message.DateMess'
                ];
                let ArrayMess = await db.SelectJoin2TableOrWhere('user', 'Message', 'user.ID', 'Message.IdUserSend', ArrayCollunm, {
                    'Message.IdUserGet': InfoUser[0].ID,
                    'Message.IdUserSend': req.params.id
                }, {
                    'Message.IdUserSend': InfoUser[0].ID,
                    'Message.IdUserGet': req.params.id
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: ArrayMess
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

let ListMessMeGet = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Email', 'user.Gender', 'user.Mobile', 'user.Avatar', 'user.Status', 'user.Country',
                    'Message.IdUserSend', 'Message.IdUserGet', 'Message.ContentMess', 'Message.StatusMess', 'Message.DateMess'
                ];
                let ArrayMess = await db.SelectDataJoin2Table('user', 'Message', 'user.ID', 'Message.IdUserGet', ArrayCollunm, {
                    'Message.IdUserSend': InfoUser[0].ID,
                    'Message.IdUserGet': req.params.id
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: ArrayMess
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

let MySendMessage = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let checkContentMess = crypto.ReplaceCharScriptFromForm(req.body.ContentMess);
                let InserMess = await db.InsertData('Message', {
                    IdUserSend: InfoUser[0].ID,
                    IdUserGet: req.body.IdUserGet,
                    ContentMess: checkContentMess,
                    StatusMess: 0,
                    DateMess: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Send message success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let MyReplyMessage = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let checkContentMess = crypto.ReplaceCharScriptFromForm(req.body.ContentMess);
                console.log(checkContentMess);
                let updateMess = await db.UpdateData('Message', {
                    IdUserSend: req.body.IdUserGet,
                    IdUserGet: InfoUser[0].ID,
                    StatusMess: 0
                }, { StatusMess: 1 })
                let InserMess = await db.InsertData('Message', {
                    IdUserSend: InfoUser[0].ID,
                    IdUserGet: req.body.IdUserGet,
                    ContentMess: checkContentMess,
                    StatusMess: 0,
                    DateMess: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Reply success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAllUserMessToMe = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Email', 'user.Gender', 'user.Status', 'user.Avatar', 'user.Country'];
            let ArrayMess = await db.SelectDataJoin2Table('user', 'Message', 'user.ID', 'Message.IdUserSend', ArrayCollunm, {
                'Message.IdUserGet': InfoUser[0].ID
            });
            let ArrayMess1 = ArrayMess.sort(function(a, b) {
                return a.ID - b.ID;
            });
            let newArr = []
            if (ArrayMess1.length > 0) {
                newArr = [ArrayMess1[0]]
            }
            for (let i = 1; i < ArrayMess1.length; i++) {
                if (ArrayMess1[i].ID !== ArrayMess1[i - 1].ID) {
                    newArr.push(ArrayMess1[i])
                }
            }
            return res.status(200).json({
                status: true,
                code: 0,
                data: newArr
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    ListMessMeUnread: ListMessMeUnread,
    ListMessMeReadAlredy: ListMessMeReadAlredy,
    ListMeSendUnread: ListMeSendUnread,
    ListAllMessOfUser: ListAllMessOfUser,
    ListMessMeGet: ListMessMeGet,
    MySendMessage: MySendMessage,
    MyReplyMessage: MyReplyMessage,
    ListAllUserMessToMe: ListAllUserMessToMe
}