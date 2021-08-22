const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');
const dateFormat = require('dateformat');

let me = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            return res.status(200).json({
                status: true,
                code: 0,
                data: InfoUser[0]
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let LogLogin = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let logLogin = await db.SelectData('logLogin', ArrayCollunm, { IDuser: InfoUser[0].ID }, "")
            return res.status(200).json({
                status: true,
                code: 0,
                data: logLogin
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAllUser = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let ArrayUser = await db.SelectData('user', ArrayCollunmSelect, "", { Token: token, Level: 1, Name: 'AdminBlogOfMe' });
        if (ArrayUser.length > 0) {
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArrayUser
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAvatarOfMe = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'ManagementAvatar.ID', 'ManagementAvatar.ImageUpdate', 'ManagementAvatar.DateUpdateImage']
            let ListAvatar = await db.SelectDataJoin2Table('user', 'ManagementAvatar', 'user.ID', 'ManagementAvatar.IDuser', ArrayCollunm, {
                'user.ID': InfoUser[0].ID
            })
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListAvatar
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListAvatarOfUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'ManagementAvatar.ID', 'ManagementAvatar.ImageUpdate', 'ManagementAvatar.DateUpdateImage']
                let ListAvatar = await db.SelectDataJoin2Table('user', 'ManagementAvatar', 'user.ID', 'ManagementAvatar.IDuser', ArrayCollunm, {
                    'user.ID': req.params.id
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: ListAvatar
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

let InfoOnceUser = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { 'user.ID': req.params.id }, { Level: 1, Name: 'AdminBlogOfMe' });
            if (InfoUser.length > 0) {
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: InfoUser[0]
                });
            } else {
                return ErrorCode.Error_510(req, res)
            }
        } else {
            return ErrorCode.Error_509(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }

}

module.exports = {
    me: me,
    ListAllUser: ListAllUser,
    InfoOnceUser: InfoOnceUser,
    ListAvatarOfMe: ListAvatarOfMe,
    ListAvatarOfUser: ListAvatarOfUser,
    LogLogin: LogLogin
};