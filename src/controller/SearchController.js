const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { InsertData } = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');

let SearchUser = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['ID', 'Name', 'Email', 'Mobile', 'Gender', 'Status', 'CreateAt', 'Avatar', 'Country'];
            let ArrayUser = await db.SelectSearch('user', ArrayCollunm, { Level: 0 }, { ID: InfoUser[0].ID, Level: 1, Name: 'AdminBlogOfMe' }, 'Name', req.body.search)
            let Email = await db.SelectSearch('user', ArrayCollunm, { Level: 0 }, { ID: InfoUser[0].ID, Level: 1, Name: 'AdminBlogOfMe' }, 'Email', req.body.search)
            let ArrayMeger = ArrayUser.concat(Email);
            let ArrayMeger1 = ArrayMeger.sort(function(a, b) {
                return a.ID - b.ID;
            });
            let newArr = []
            if (ArrayMeger1.length > 0) {
                newArr = [ArrayMeger1[0]]
            }
            for (let i = 1; i < ArrayMeger1.length; i++) {
                if (ArrayMeger1[i].ID !== ArrayMeger1[i - 1].ID) {
                    newArr.push(ArrayMeger1[i])
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

let SearchPost = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let ArrayTitle = await db.SelectSearch('listPost', ArrayCollunm, { Privacy: 0 }, {}, 'TitlePost', req.body.search);
            let ArrayContent = await db.SelectSearch('listPost', ArrayCollunm, { Privacy: 0 }, {}, 'Content', req.body.search);
            let ArrayMeger = ArrayTitle.concat(ArrayContent);
            let ArrayMeger1 = ArrayMeger.sort(function(a, b) {
                return a.ID - b.ID;
            });
            let newArr = []
            if (ArrayMeger1.length > 0) {
                newArr = [ArrayMeger1[0]]
            }
            for (let i = 1; i < ArrayMeger1.length; i++) {
                if (ArrayMeger1[i].ID !== ArrayMeger1[i - 1].ID) {
                    newArr.push(ArrayMeger1[i])
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

let SearchPostPersonel = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let ArrayTitle = await db.SelectSearch('listPost', ArrayCollunm, {}, {}, 'TitlePost', req.body.search);
            let ArrayContent = await db.SelectSearch('listPost', ArrayCollunm, {}, {}, 'Content', req.body.search);
            let ArrayMeger = ArrayTitle.concat(ArrayContent);
            let ArrayMeger1 = ArrayMeger.sort(function(a, b) {
                return a.ID - b.ID;
            });
            let newArr = []
            if (ArrayMeger1.length > 0) {
                newArr = [ArrayMeger1[0]]
            }
            for (let i = 1; i < ArrayMeger1.length; i++) {
                if (ArrayMeger1[i].ID !== ArrayMeger1[i - 1].ID) {
                    newArr.push(ArrayMeger1[i])
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

let seachDate = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = ['user.ID', 'user.Name', 'user.Gender', 'user.Status', 'user.Avatar', "listPost.ID", 'listPost.IDuser', 'listPost.TitlePost', 'listPost.Content', 'listPost.Image', 'listPost.Privacy', 'listPost.DatePost'];
            let ArraySearch = await db.SelectSearch2Table('user', 'listPost', 'user.ID', 'listPost.IDuser', ArrayCollunm, {
                'listPost.Privacy': 0,
                'user.Level': 0
            }, 'DatePost', dateFormat(req.body.searchDate, "dd mm yyyy"))
            return res.status(200).json({
                status: true,
                code: 0,
                data: ArraySearch
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

module.exports = {
    SearchUser: SearchUser,
    SearchPost: SearchPost,
    seachDate: seachDate,
    SearchPostPersonel: SearchPostPersonel
}