const debug = console.log.bind(console);
const db = require("../database/QuerryData");
const dateFormat = require('dateformat');
const { InsertData, SelectData } = require("../database/QuerryData");
const ErrorCode = require('../error/ErrorCode');
const { Error_407, Error_500 } = require("../error/ErrorCode");
const crypto = require('./Crypto');

let CreateTopic = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let SelectTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                IDuserCreate: InfoUser[0].ID,
                NameTopic: req.body.NameTopic
            }, '');
            if (SelectTopic.length > 0) {
                return ErrorCode.Error_517(req, res)
            } else {
                let checkNameTopic = crypto.ReplaceCharScriptFromForm(req.body.NameTopic);
                let createTopic = await db.InsertData('TopicOfMe', {
                    IDuserCreate: InfoUser[0].ID,
                    NameTopic: checkNameTopic,
                    StatusTopic: 0,
                    Description: '',
                    DateCreate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Create topic success."
                });
            }
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        console.log(error);
        return ErrorCode.Error_500(req, res)
    }
}

let ListTopicOfMe = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let SelectTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                StatusTopic: 0,
                IDuserCreate: InfoUser[0].ID
            }, "");
            return res.status(200).json({
                status: true,
                code: 0,
                data: SelectTopic
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DescriptionTopic = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkContentDesc = crypto.ReplaceCharScriptFromForm(req.body.ContentDesc);
            let updateDescription = await db.UpdateData('TopicOfMe', {
                ID: req.body.IdDesc
            }, {
                Description: checkContentDesc
            });
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Update description success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeleteTopic = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                    ID: req.params.id,
                    IDuserCreate: InfoUser[0].ID
                }, "");
                if (infoTopic.length > 0) {
                    let DeleteDescription = await db.UpdateData('TopicOfMe', {
                        ID: req.params.id
                    }, {
                        StatusTopic: 1
                    });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Delete topic success."
                    });
                } else {
                    return ErrorCode.Error_525(req, res)
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

let RecycleTopic = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let recycleTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                StatusTopic: 1,
                IDuserCreate: InfoUser[0].ID
            }, "");
            return res.status(200).json({
                status: true,
                code: 0,
                data: recycleTopic
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let RestoreTopic = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                    ID: req.params.id,
                    IDuserCreate: InfoUser[0].ID
                }, '')
                if (infoTopic.length > 0) {
                    let RestoreTopic = await db.UpdateData('TopicOfMe', {
                        ID: req.params.id
                    }, {
                        StatusTopic: 0
                    });
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        message: "Restore topic success."
                    });
                } else {
                    return ErrorCode.Error_526(req, res)
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

let ListProblem = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                    ID: req.params.id,
                    IDuserCreate: InfoUser[0].ID
                }, '')
                if (infoTopic.length > 0) {
                    let listProblem = await db.SelectData('MyProblem', ArrayCollunm, {
                        IDtopic: req.params.id
                    }, "");
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: listProblem
                    });
                } else {
                    return ErrorCode.Error_527(req, res)
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

let InfoTopic = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                    ID: req.params.id,
                    IDuserCreate: InfoUser[0].ID
                }, '')
                if (infoTopic.length > 0) {
                    let InfoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, {
                        ID: req.params.id
                    }, "");
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: InfoTopic
                    });
                } else {
                    return ErrorCode.Error_527(req, res)
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

let CreateProblem = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkContentProblem = crypto.ReplaceCharScriptFromForm(req.body.ContentProblem);
            let createProblem = await db.InsertData('MyProblem', {
                IDtopic: req.body.IdTopic,
                ContentProblem: checkContentProblem,
                ProblemDate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            })
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Create problem success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListSolution = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectDataJoin2Table('MyProblem', 'TopicOfMe', 'MyProblem.IDtopic', 'TopicOfMe.ID',
                    ArrayCollunm, {
                        'MyProblem.ID': req.params.id,
                        'TopicOfMe.IDuserCreate': InfoUser[0].ID
                    })
                if (infoTopic.length > 0) {
                    let listSolution = await db.SelectData('Solution', ArrayCollunm, {
                        IDproblem: req.params.id
                    }, "");
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: listSolution
                    });
                } else {
                    return ErrorCode.Error_528(req, res)
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

let InfoProblem = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectDataJoin2Table('MyProblem', 'TopicOfMe', 'MyProblem.IDtopic', 'TopicOfMe.ID',
                    ArrayCollunm, {
                        'MyProblem.ID': req.params.id,
                        'TopicOfMe.IDuserCreate': InfoUser[0].ID
                    });
                if (infoTopic.length > 0) {
                    let InfoProblem = await db.SelectData('MyProblem', ArrayCollunm, {
                        ID: req.params.id
                    }, "");
                    return res.status(200).json({
                        status: true,
                        code: 0,
                        data: InfoProblem
                    });
                } else {
                    return ErrorCode.Error_529(req, res)
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

let CreateSolution = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkContentSolution = crypto.ReplaceCharScriptFromForm(req.body.ContentSolution);
            let createSolution = await db.InsertData('Solution', {
                IDproblem: req.body.IdProblem,
                ContentSolution: checkContentSolution,
                Note: '',
                SolutionDate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            })
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Create solution success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeleteSolution = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let selectSolution = await db.SelectData('Solution', ArrayCollunm, { ID: req.params.id }, '');
                if (selectSolution.length > 0) {
                    let myProlem = await db.SelectData('MyProblem', ArrayCollunm, { ID: selectSolution[0].IDproblem }, '')
                    let mytopic = await db.SelectData('TopicOfMe', ArrayCollunm, { ID: myProlem[0].IDtopic }, '')
                    if (mytopic[0].IDuserCreate == InfoUser[0].ID) {
                        let DeleteSolution = await db.DeleteData('Solution', {
                            ID: req.params.id
                        });
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: "Delete solution success."
                        });
                    } else {
                        return ErrorCode.Error_520(req, res)
                    }

                } else {
                    return ErrorCode.Error_519(req, res)
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

let DeleteProblem = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let slectProlem = await db.SelectData('MyProblem', ArrayCollunm, { ID: req.params.id }, '');
                if (slectProlem.length > 0) {
                    let mytopic = await db.SelectData('TopicOfMe', ArrayCollunm, { ID: slectProlem[0].IDtopic }, '')
                    if (mytopic[0].IDuserCreate == InfoUser[0].ID) {
                        let DeleteSolution = await db.DeleteData('Solution', {
                            IDproblem: slectProlem[0].ID
                        });
                        let deleteProblem = await db.DeleteData('MyProblem', {
                            ID: req.params.id
                        })
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: "Delete problem success."
                        });
                    } else {
                        return ErrorCode.Error_532(req, res)
                    }

                } else {
                    return ErrorCode.Error_531(req, res)
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

let DestroyTopic = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let ArrayCollunm = [];
                let infoTopic = await db.SelectData('TopicOfMe', ArrayCollunm, { ID: req.params.id, IDuserCreate: InfoUser[0].ID }, '');
                if (infoTopic.length > 0) {
                    let infoProblem = await db.SelectData('MyProblem', ArrayCollunm, { IDtopic: infoTopic[0].ID }, '')
                    if (infoProblem.length > 0) {
                        for (let i = 0; i < infoProblem.length; i++) {
                            let DeleteSolution = await db.DeleteData('Solution', {
                                IDproblem: infoProblem[i].ID
                            });
                            let deleteProblem = await db.DeleteData('MyProblem', {
                                ID: infoProblem[i].ID
                            })
                            let deleteTopic = await db.DeleteData('TopicOfMe', {
                                ID: req.params.id
                            })
                        }
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: "Remove topic success."
                        });
                    } else {
                        let deleteTopic = await db.DeleteData('TopicOfMe', {
                            ID: req.params.id
                        })
                        return res.status(200).json({
                            status: true,
                            code: 0,
                            message: "Remove topic success."
                        });
                    }

                } else {
                    return ErrorCode.Error_518(req, res)
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

let AddSchedule = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkScheduleContent = crypto.ReplaceCharScriptFromForm(req.body.ScheduleContent);
            let addschedule = await db.InsertData('MySchedule', {
                IDuser: InfoUser[0].ID,
                DateImplement: req.body.ScheduleDate,
                TimeFrame: req.body.ScheduleTime,
                ContentSchedule: checkScheduleContent,
                DateCreate: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            })
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Add schedule success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let ListMySchedule = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let ArrayCollunm = [];
            let myschedule = await db.SelectData('MySchedule', ArrayCollunm, {
                IDuser: InfoUser[0].ID
            }, "");
            return res.status(200).json({
                status: true,
                code: 0,
                data: myschedule
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let EditSchedule = async(req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
        let ArrayCollunmSelect = [];
        let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
        if (InfoUser.length > 0) {
            let checkScheduleContent = crypto.ReplaceCharScriptFromForm(req.body.ScheduleContent);
            let editschedule = await db.UpdateData('MySchedule', { ID: req.body.ScheduleID, IDuser: InfoUser[0].ID }, {
                ContentSchedule: checkScheduleContent
            })
            return res.status(200).json({
                status: true,
                code: 0,
                message: "Edit schedule success."
            });
        } else {
            return ErrorCode.Error_505(req, res)
        }
    } catch (error) {
        return ErrorCode.Error_500(req, res)
    }
}

let DeleteSchedule = async(req, res) => {
    try {
        if (isNaN(req.params.id) == false) {
            const token = req.headers["x-access-token"] || req.headers.authorization.split(' ')[1];
            let ArrayCollunmSelect = [];
            let InfoUser = await db.SelectData('user', ArrayCollunmSelect, { Token: token }, "");
            if (InfoUser.length > 0) {
                let deleteTopic = await db.DeleteData('MySchedule', {
                    ID: req.params.id,
                    IDuser: InfoUser[0].ID
                })
                return res.status(200).json({
                    status: true,
                    code: 0,
                    message: "Delete schedule success."
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
    CreateTopic: CreateTopic,
    ListTopicOfMe: ListTopicOfMe,
    DescriptionTopic: DescriptionTopic,
    DeleteTopic: DeleteTopic,
    RecycleTopic: RecycleTopic,
    RestoreTopic: RestoreTopic,
    ListProblem: ListProblem,
    InfoTopic: InfoTopic,
    CreateProblem: CreateProblem,
    ListSolution: ListSolution,
    InfoProblem: InfoProblem,
    CreateSolution: CreateSolution,
    DeleteSolution: DeleteSolution,
    DeleteProblem: DeleteProblem,
    DestroyTopic: DestroyTopic,
    AddSchedule: AddSchedule,
    ListMySchedule: ListMySchedule,
    EditSchedule: EditSchedule,
    DeleteSchedule: DeleteSchedule
}