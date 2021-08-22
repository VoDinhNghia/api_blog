const db = require("../database/QuerryData")
const dateFormat = require('dateformat');
const crypto = require("./Crypto")
const MailController = require("./MailController");
const ErrorCode = require('../error/ErrorCode');

let SendPassToMail = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            let checkUsername = crypto.ReplaceCharScriptFromForm(req.body.UserName);
            let checkMail = crypto.ReplaceCharScriptFromForm(req.body.EmailUser);
            let InsertUsergetPass = await db.InsertData('userGetPass', {
                UserName: checkUsername,
                EmailUser: checkMail,
                DateGetPass: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
            });
            let CountNumUserGetPass = await db.SelectWhereLike('userGetPass', {
                UserName: req.body.UserName,
                EmailUser: req.body.EmailUser
            }, 'DateGetPass');
            if (CountNumUserGetPass.length > 2) {
                return ErrorCode.Error_511(req, res)
            } else {
                let ArrayCollunm = [];
                let QuerryUserGetPass = await db.SelectData('user', ArrayCollunm, { Name: req.body.UserName, Email: req.body.EmailUser }, "");
                try {
                    if (QuerryUserGetPass.length > 0) {
                        let Result = MailController.SendPassMail(QuerryUserGetPass[0].Name, QuerryUserGetPass[0].Email, crypto.DicipherPass(QuerryUserGetPass[0].Password));
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: 'Success.'
                        })
                    } else {
                        return ErrorCode.Error_513(req, res)
                    }
                } catch (error) {
                    return ErrorCode.Error_512(req, res)
                }
            }
        }
    } catch (error) {
        console.log(error)
        return ErrorCode.Error_500(req, res)
    }
}

let SendContact = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = ['ID', 'Name', 'Email'];
            let InfoYourContact = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoYourContact.length > 0) {
                let checkContentSugget = crypto.ReplaceCharScriptFromForm(req.body.Content);
                let InsertData = await db.InsertData('Contact', {
                    IDuser: InfoYourContact[0].ID,
                    ContentContact: checkContentSugget,
                    ContentReply: '',
                    Type: 0,
                    DateContact: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                    DateReply: ''
                });
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Send contact success."
                });
            } else {
                return ErrorCode.Error_505(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    SendPassToMail: SendPassToMail,
    SendContact: SendContact
}