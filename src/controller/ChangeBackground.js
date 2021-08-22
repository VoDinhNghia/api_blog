const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { CountNumAccount } = require('../database/QuerryData');
const ErrorCode = require('../error/ErrorCode');

let ChangeBackground = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let checkBackground = await db.SelectData('ChangeBackground', ArrayCollunm, { IDuser: InfoUser[0].ID }, '');
            if (checkBackground.length > 0) {
                let updateBG = await db.UpdateData('ChangeBackground', { IDuser: InfoUser[0].ID }, {
                    Mode: req.body.ModeBG
                })
            } else {
                let insertBackground = await db.InsertData('ChangeBackground', {
                    IDuser: InfoUser[0].ID,
                    Mode: req.body.ModeBG
                })
            }
            return res.status(200).json({
                status: true,
                code: 0,
                message: 'Change background success.'
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}
let GetBackground = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let GetBG = await db.SelectData('ChangeBackground', ArrayCollunm, { IDuser: InfoUser[0].ID }, '')
            if (GetBG.length > 0) {
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: GetBG
                });
            } else {
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: { Mode: 'light' }
                });
            }
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    ChangeBackground: ChangeBackground,
    GetBackground: GetBackground
}