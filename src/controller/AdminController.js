const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { CountNumAccount } = require('../database/QuerryData');
const ErrorCode = require('../error/ErrorCode');

let NotifyContact = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.Name', 'user.Gender', 'user.Status', 'user.Avatar',
                'Contact.ID', 'Contact.IDuser', 'Contact.ContentContact', 'Contact.DateContact'
            ];
            let NumMessage = await db.SelectDataJoin2Table('Contact', 'user', 'Contact.IDuser', 'user.ID',
                ArrayCollunm, { Type: 0 });
            return res.status(200).json({
                status: true,
                code: 0,
                data: NumMessage
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeleteAccountUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token, Level: 1, Name: 'AdminBlogOfMe' }, { Level: 0, Level: 2 });
            if (InfoUser.length > 0) {
                let delBackground = await db.DeleteData('ChangeBackground', { IDuser: req.params.id });
                let delContact = await db.DeleteData('Contact', { IDuser: req.params.id });
                let delLogLogin = await db.DeleteData('logLogin', { IDuser: req.params.id });
                let delAvatar = await db.DeleteData('ManagementAvatar', { IDuser: req.params.id });
                let delflow = await db.DeleteData('managemenFllow', { IdUserFllow: req.params.id });
                let delflowed = await db.DeleteData('managemenFllow', { IdUserFllowed: req.params.id });
                let messageSend = await db.DeleteData('Message', { IdUserSend: req.params.id });
                let messageGet = await db.DeleteData('Message', { IdUserGet: req.params.id });
                let ArrayCollunm = [];
                let selectPost = await db.SelectData('listPost', ArrayCollunm, { IDuser: req.params.id }, '');
                let delNotifySLC = await db.DeleteData('shareLikeComment', { IDuser: req.params.id });
                if (selectPost.length > 0) {
                    for (let i = 0; i < selectPost.length; i++) {
                        let delPostSLC = await db.DeleteData('shareLikeComment', { IDpost: selectPost[i].ID });
                        let delPost = await db.DeleteData('listPost', { ID: selectPost[i].ID });
                    }
                }
                let selectTopic = await db.SelectData('TopicOfMe', ArrayCollunm, { IDuserCreate: req.params.id }, '');
                if (selectTopic.length > 0) {
                    for (let i = 0; i < selectTopic.length; i++) {
                        let selectProblem = await db.SelectData('MyProblem', ArrayCollunm, { IDtopic: selectTopic[i].ID }, '');
                        if (selectProblem.length > 0) {
                            for (let i = 0; i < selectProblem.length; i++) {
                                let delSolution = await db.DeleteData('Solution', { IDproblem: selectProblem[i].ID });
                                let delProblem = await db.DeleteData('MyProblem', { ID: selectProblem[i].ID });
                            }
                            let delTopic = await db.DeleteData('TopicOfMe', { ID: selectTopic[i].ID });
                        } else {
                            let delTopic = await db.DeleteData('TopicOfMe', { ID: selectTopic[i].ID });
                        }
                    }
                }
                let delSchedule = await db.DeleteData('MySchedule', { IDuser: req.params.id });
                let deluser = await db.DeleteData('user', { ID: req.params.id });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Delete user success."
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

let DeletePostUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token, Level: 1, Name: 'AdminBlogOfMe' }, { Level: 0, Level: 2 });
            if (InfoUser.length > 0) {
                let delNotifySLC = await db.DeleteData('shareLikeComment', { IDpost: req.params.id });
                let delPost = await db.DeleteData('listPost', { ID: req.params.id });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Success."
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

let BlockUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token, Level: 1, Name: 'AdminBlogOfMe' }, { Level: 0, Level: 2 });
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let CheckUserBlock = await db.SelectData('user', ArrayCollunm, {
                    ID: req.params.id
                }, { Level: 1, ID: InfoUser[0].ID })
                if (CheckUserBlock[0].Level == 0) {
                    let blockUser = await db.UpdateData('user', {
                        ID: CheckUserBlock[0].ID
                    }, { Level: 2 });
                } else {
                    let blockUser = await db.UpdateData('user', {
                        ID: CheckUserBlock[0].ID
                    }, { Level: 0 });
                }
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Blocked Success."
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
    NotifyContact: NotifyContact,
    DeleteAccountUser: DeleteAccountUser,
    DeletePostUser: DeletePostUser,
    BlockUser: BlockUser
}