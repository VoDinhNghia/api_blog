const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const crypto = require("./Crypto");
const fs = require('fs');
const { InsertData } = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');

let UpdateProfile = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkAvatar = crypto.ReplaceCharScriptFromForm(req.body.Avatar);
            let checkUserName = crypto.ReplaceCharScriptFromForm(req.body.UserName);
            let checkCountry = crypto.ReplaceCharScriptFromForm(req.body.Country);
            let UpdateData = await db.UpdateData("user", { Token: InfoUser[0].Token }, {
                Name: checkUserName || InfoUser[0].Name,
                Mobile: req.body.Mobile || InfoUser[0].Mobile,
                Gender: req.body.Gender,
                Avatar: checkAvatar || InfoUser[0].Avatar,
                DateUpdate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                Country: checkCountry || InfoUser[0].Country
            });
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Update success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let UpdateAvatar = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let avatar = await db.SelectData('ManagementAvatar', ArrayCollunm, { ID: req.params.id }, "");
                if (avatar.length > 0) {
                    let UpdateData = await db.UpdateData("user", { Token: InfoUser[0].Token }, {
                        Avatar: avatar[0].ImageUpdate,
                        DateUpdate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                    });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Update success."
                    });
                } else {
                    return ErrorCode.Error_522(req, res)
                }
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

let InsertAvatar = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let checkAvatar = crypto.ReplaceCharScriptFromForm(req.body.Avatar);
                let insertData = await db.InsertData('ManagementAvatar', {
                    IDuser: InfoUser[0].ID,
                    ImageUpdate: checkAvatar,
                    DateUpdateImage: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Update success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeleteAvatar = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = []
                let path = await db.SelectData('ManagementAvatar', ArrayCollunm, { ID: req.params.id, IDuser: InfoUser[0].ID }, "");
                if (path.length > 0) {
                    if (path[0].ImageUpdate == InfoUser[0].Image) {
                        let DelAvatar = await db.DeleteData('ManagementAvatar', { ID: req.params.id, IDuser: InfoUser[0].ID });
                        let UpdateAvatar = await db.UpdateData('user', { ID: InfoUser[0].ID }, { Avatar: '' });
                    } else {
                        let DelAvatar = await db.DeleteData('ManagementAvatar', { ID: req.params.id, IDuser: InfoUser[0].ID });
                    }
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Delete success."
                    });
                } else {
                    return ErrorCode.Error_522(req, res)
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

let ChangePass = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                if (req.body.NewPassword == undefined || req.body.CurrentPass == undefined) {
                    return ErrorCode.Error_506(req, res)
                } else {
                    if (crypto.CryptoPass(req.body.CurrentPass) != InfoUser[0].Password) {
                        return ErrorCode.Error_507(req, res)
                    } else {
                        if ((req.body.NewPassword).length < 6) {
                            return ErrorCode.Error_501(req, res)
                        } else {
                            if (req.body.CurrentPass == req.body.NewPassword) {
                                return ErrorCode.Error_508(req, res)
                            } else {
                                let UpdateData = await db.UpdateData("user", { Token: InfoUser[0].Token }, {
                                    Password: crypto.CryptoPass(req.body.NewPassword),
                                    DateUpdate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                                });
                                return res.status(200).json({
                                    status: true,
                                    code: 0,
                                    message: "Change password success."
                                });
                            }
                        }
                    }
                }
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}
module.exports = {
    UpdateProfile: UpdateProfile,
    ChangePass: ChangePass,
    UpdateAvatar: UpdateAvatar,
    DeleteAvatar: DeleteAvatar,
    InsertAvatar: InsertAvatar
};