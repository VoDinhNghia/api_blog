const jwtHelper = require("../helper/jwt.Helper");
const debug = console.log.bind(console);
const db = require("../database/QuerryData")
const dateFormat = require('dateformat');
const crypto = require("./Crypto");
const ConfigKeySecret = require("../config/Config").ConfigKeySecret
const ErrorCode = require('../error/ErrorCode');
const emailExisted = require("email-existence");
const e = require("express");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || ConfigKeySecret.accessTokenLife;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || ConfigKeySecret.accessTokenSecret;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || ConfigKeySecret.refreshTokenLife;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || ConfigKeySecret.refreshTokenSecret;

let login = async(req, res) => {
    try {
        let CheckUserLogin = '';
        try {
            let ArrayCollunmSelect = [];
            if (req.body.UserName.indexOf('@') == -1) {
                CheckUserLogin = await db.SelectData('user', ArrayCollunmSelect, { Name: req.body.UserName, Password: crypto.CryptoPass(req.body.PassWord) }, '');
            } else {
                CheckUserLogin = await db.SelectData('user', ArrayCollunmSelect, { Email: req.body.UserName, Password: crypto.CryptoPass(req.body.PassWord) }, '');
            }
        } catch (error) {
            return ErrorCode.Error_405(req, res);
        }
        if (CheckUserLogin.length > 0) {
            if (CheckUserLogin[0].Level == 2) {
                return ErrorCode.Error_399(req, res)
            } else {
                const DataUser = {
                    _id: CheckUserLogin[0].ID,
                    name: CheckUserLogin[0].Name,
                    email: CheckUserLogin[0].Email,
                };
                const accessToken = await jwtHelper.generateToken(DataUser, accessTokenSecret, accessTokenLife);
                //const refreshToken = await jwtHelper.generateToken(data_user, refreshTokenSecret, refreshTokenLife);
                let UpdateData = await db.UpdateData('user', { ID: CheckUserLogin[0].ID }, {
                    "Token": accessToken,
                    "Status": 1
                });
                let ArrayCollunmSelect = ['ID', 'Name', 'Token', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'DateUpdate', 'Avatar', 'Country'];
                let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Email: CheckUserLogin[0].Email, Password: CheckUserLogin[0].Password }, "");
                let ArrayCollunm = [];
                let selectLog = await db.SelectData('logLogin', ArrayCollunm, { IDuser: InfoUser[0].ID }, "");
                let deviceLogin = '';
                if (req.body.DeviceLogin == undefined) { deviceLogin = 'Swagger' } else {
                    deviceLogin = req.body.DeviceLogin
                }
                if (selectLog.length > 0) {
                    let updateLog = await db.UpdateData('logLogin', { IDuser: InfoUser[0].ID }, {
                        LastLogin: selectLog[0].CurentLogin,
                        CurentLogin: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                        DeviceLogin: deviceLogin
                    })
                } else {
                    let insertLog = await db.InsertData('logLogin', {
                        IDuser: InfoUser[0].ID,
                        LastLogin: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                        CurentLogin: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                        DeviceLogin: deviceLogin
                    });
                }
                return res.status(200).json({
                    status: true,
                    code: 0,
                    data: InfoUser[0]
                });
            }
        } else {
            return ErrorCode.Error_402(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let register = async(req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return ErrorCode.Error_407(req, res)
        } else {
            try {
                // emailExisted.check(req.body.Email, async(error, response) => {
                //     if (response == true) {

                //     } else {
                //         return ErrorCode.Error_530(req, res)
                //     }
                // });
                let CheckMail = await db.CountNumAccount('user', { Email: req.body.Email });
                if (CheckMail[0].count > 0) {
                    return ErrorCode.Error_408(req, res)
                } else {
                    if ((req.body.PassWord).length < 6) {
                        return ErrorCode.Error_501(req, res)
                    } else {
                        let checkEmail = crypto.ReplaceCharScriptFromForm(req.body.Email);
                        let SignUpToData = await db.InsertData('user', {
                            Name: req.body.UserName,
                            Password: crypto.CryptoPass(req.body.PassWord),
                            Token: "",
                            Email: checkEmail,
                            Mobile: req.body.Mobile,
                            Gender: req.body.Gender || 1,
                            Level: 0, // user bình thường, nếu 1 là admin
                            Status: 0, // 1: action, 0: logout
                            CreateAt: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                            DateUpdate: '',
                            Avatar: '',
                            Country: ''
                        });
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: "register success."
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                return ErrorCode.Error_405(req, res)
            }
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let logout = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let UpdateData = await db.UpdateData('user', { Token: token }, { "Token": '', Status: 0 });
        return res.status(200).json({
            status: true,
            code: 0,
            message: "Logout success."
        });
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let refreshToken = async(req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            const userFakeData = decoded.data;
            //debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            return res.status(200).json({ accessToken });
        } catch (error) {
            return ErrorCode.Error_403(req, res)
        }
    } else {
        return ErrorCode.Error_403(req, res)
    }
};

module.exports = {
    login: login,
    refreshToken: refreshToken,
    register: register,
    logout: logout
}