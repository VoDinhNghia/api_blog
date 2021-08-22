const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');
const dateFormat = require('dateformat');

let Follow = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'managemenFllow.ID', 'managemenFllow.IdUserFllow',
                    'managemenFllow.IdUserFllowed', 'managemenFllow.StatusFllow', 'managemenFllow.DateFllow'
                ]
                let CheckFollowOfMe = await db.SelectDataJoin2Table('managemenFllow', 'user', 'managemenFllow.IdUserFllowed', 'user.ID', ArrayCollunm, {
                    'managemenFllow.IdUserFllow': InfoUser[0].ID,
                    'managemenFllow.IdUserFllowed': req.params.id
                })
                if (CheckFollowOfMe.length > 0) {
                    if (CheckFollowOfMe[0].StatusFllow == 0) {
                        let updateFlow = await db.UpdateData('managemenFllow', {
                            IdUserFllow: InfoUser[0].ID,
                            IdUserFllowed: req.params.id
                        }, {
                            StatusFllow: 1,
                            DateFllow: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                        })
                    } else {
                        let updateFlow = await db.UpdateData('managemenFllow', {
                            IdUserFllow: InfoUser[0].ID,
                            IdUserFllowed: req.params.id
                        }, {
                            StatusFllow: 0,
                            DateFllow: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                        })
                    }
                } else {
                    if (req.params.id == InfoUser[0].ID) {
                        return ErrorCode.Error_521(req, res)
                    } else {
                        let InsertFlow = await db.InsertData('managemenFllow', {
                            IdUserFllow: InfoUser[0].ID,
                            IdUserFllowed: req.params.id,
                            StatusFllow: 1,
                            DateFllow: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                        })
                    }
                }
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: 'Follow success.'
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

let CheckFllow = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'managemenFllow.ID', 'managemenFllow.IdUserFllow',
                    'managemenFllow.IdUserFllowed', 'managemenFllow.StatusFllow', 'managemenFllow.DateFllow'
                ]
                let CheckFollowOfMe = await db.SelectDataJoin2Table('managemenFllow', 'user', 'managemenFllow.IdUserFllowed', 'user.ID', ArrayCollunm, {
                    'managemenFllow.IdUserFllow': InfoUser[0].ID,
                    'managemenFllow.IdUserFllowed': req.params.id,
                    'managemenFllow.StatusFllow': 1
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: CheckFollowOfMe
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

let RemoveFllow = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let follow = await db.SelectData('managemenFllow', ArrayCollunm, {
                    IdUserFllow: InfoUser[0].ID,
                    IdUserFllowed: req.params.id
                }, '')
                if (follow.length > 0) {
                    let DellFollow = await db.UpdateData('managemenFllow', {
                        IdUserFllow: InfoUser[0].ID,
                        IdUserFllowed: req.params.id
                    }, { StatusFllow: 0 })
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Remove follow success."
                    });
                } else {
                    return ErrorCode.Error_524(req, res)
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

let ListPostOfUserYouFllow = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['managemenFllow.ID', 'managemenFllow.IdUserFllow', 'managemenFllow.IdUserFllowed',
                'managemenFllow.StatusFllow', 'managemenFllow.DateFllow', 'user.ID', 'user.Name', 'user.Email', 'user.Mobile',
                'user.Gender', 'user.Status', 'user.Avatar', 'user.Country', 'listPost.ID', 'listPost.IDuser', 'listPost.TitlePost',
                'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost'
            ]
            let ListPostUser = await db.SelectDataJoin3Table('managemenFllow', 'user', 'listPost', 'managemenFllow.IdUserFllowed',
                'user.ID', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                    'managemenFllow.IdUserFllow': InfoUser[0].ID,
                    'managemenFllow.StatusFllow': 1,
                    'listPost.Privacy': 0
                }, '')
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListPostUser
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListUserFllowMe = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['managemenFllow.ID', 'managemenFllow.IdUserFllow', 'managemenFllow.IdUserFllowed',
                'managemenFllow.StatusFllow', 'managemenFllow.DateFllow', 'user.ID', 'user.Name', 'user.Email', 'user.Mobile',
                'user.Gender', 'user.Status', 'user.Avatar', 'user.Country'
            ]
            let ListUser = await db.SelectDataJoin2Table('managemenFllow', 'user', 'managemenFllow.IdUserFllow', 'user.ID', ArrayCollunm, {
                'managemenFllow.IdUserFllowed': InfoUser[0].ID,
                'managemenFllow.StatusFllow': 1
            }, '')
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListUser
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        console.log(error);
        return ErrorCode.Error_500(req, res)
    }
}

let ListUserMeFollow = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['managemenFllow.ID', 'managemenFllow.IdUserFllow', 'managemenFllow.IdUserFllowed',
                'managemenFllow.StatusFllow', 'managemenFllow.DateFllow', 'user.ID', 'user.Name', 'user.Email', 'user.Mobile',
                'user.Gender', 'user.Status', 'user.Avatar', 'user.Country'
            ]
            let ListUser = await db.SelectDataJoin2Table('managemenFllow', 'user', 'managemenFllow.IdUserFllowed', 'user.ID', ArrayCollunm, {
                'managemenFllow.IdUserFllow': InfoUser[0].ID,
                'managemenFllow.StatusFllow': 1
            }, '')
            return res.status(200).json({
                status: true,
                code: 0,
                data: ListUser
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    Follow: Follow,
    CheckFllow: CheckFllow,
    RemoveFllow: RemoveFllow,
    ListPostOfUserYouFllow: ListPostOfUserYouFllow,
    ListUserFllowMe: ListUserFllowMe,
    ListUserMeFollow: ListUserMeFollow
}