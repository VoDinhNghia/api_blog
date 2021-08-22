let Error_401 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 401,
        message: 'Unauthorized.'
    })
}
let Error_402 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 402,
        message: "Username or password invalid."
    })
}
let Error_403 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 403,
        message: "No token provided."
    })
}
let Error_404 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 404,
        message: "page not found."
    })
}
let Error_405 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 405,
        message: "Miss params email or password."
    })
}
let Error_406 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 406,
        message: "Unauthorized or token expired, please check token."
    })
}
let Error_407 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 407,
        message: "Body null or params not exactly."
    })
}
let Error_408 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 408,
        message: "This is email already exists."
    })
}
let Error_500 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 500,
        message: "Server interval."
    })
}
let Error_501 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 501,
        message: "Length of password must >= 6."
    })
}
let Error_505 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 505,
        message: "User logout, please login against."
    })
}
let Error_506 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 506,
        message: "Miss params new_password."
    })
}
let Error_507 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 507,
        message: "Current password invalid."
    })
}
let Error_508 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 508,
        message: "Current password duplicate with new password."
    })
}
let Error_509 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 509,
        message: "Miss params id."
    })
}
let Error_510 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 510,
        message: "This user not found."
    })
}
let Error_511 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 511,
        message: "Get password exceed 2 per day."
    })
}
let Error_512 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 512,
        message: "Security error, please go to google account settings page to install the security section"
    })
}
let Error_513 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 513,
        message: "The account has not been registered."
    })
}
let Error_514 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 514,
        message: "Not found post."
    })
}
let Error_515 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 515,
        message: "Query params null."
    })
}
let Error_516 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 516,
        message: "This is post not delete, please delete post yourself."
    })
}

let Error_517 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 517,
        message: "This is topic exist already."
    })
}
let Error_518 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 518,
        message: "This is topic not exists."
    })
}

let Error_519 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 519,
        message: "Not found solution."
    })
}
let Error_520 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 520,
        message: "This solution Not delete because it's not of your solution."
    });
}

let Error_521 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 521,
        message: "You can't fllow yourself."
    });
}
let Error_522 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 522,
        message: "This is avatar not found in list your avatar."
    });
}
let Error_523 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 523,
        message: "This is can not notify because It is not found."
    });
}
let Error_524 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 524,
        message: "Can't remove follow because this person your follow not yet."
    });
}
let Error_525 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 525,
        message: "Can't remove topic because this topic not found in list your topic."
    });
}
let Error_526 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 526,
        message: "Can't restore topic because this topic not found in list your topic."
    });
}
let Error_527 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 527,
        message: "This is topic not found in your list topic."
    });
}
let Error_528 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 528,
        message: "This is problem not found in your list topic => can't list solution."
    });
}
let Error_529 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 529,
        message: "This is problem not found in your list topic => can't get info of problem."
    });
}

let Error_530 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 530,
        message: "This email not exists, please enter real email."
    });
}

let Error_531 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 531,
        message: "Not found problem."
    });
}

let Error_532 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 532,
        message: "This problem Not delete because it's not of your problem."
    });
}
let Error_399 = async(req, res) => {
    return res.status(200).json({
        status: false,
        code: 399,
        message: "Account blocked."
    });
}


module.exports = {
    Error_399: Error_399,
    Error_401: Error_401,
    Error_402: Error_402,
    Error_403: Error_403,
    Error_404: Error_404,
    Error_405: Error_405,
    Error_406: Error_406,
    Error_407: Error_407,
    Error_408: Error_408,
    Error_500: Error_500,
    Error_501: Error_501,
    Error_505: Error_505,
    Error_506: Error_506,
    Error_507: Error_507,
    Error_508: Error_508,
    Error_509: Error_509,
    Error_510: Error_510,
    Error_511: Error_511,
    Error_512: Error_512,
    Error_513: Error_513,
    Error_514: Error_514,
    Error_515: Error_515,
    Error_516: Error_516,
    Error_517: Error_517,
    Error_518: Error_518,
    Error_519: Error_519,
    Error_520: Error_520,
    Error_521: Error_521,
    Error_522: Error_522,
    Error_523: Error_523,
    Error_524: Error_524,
    Error_525: Error_525,
    Error_526: Error_526,
    Error_527: Error_527,
    Error_528: Error_528,
    Error_529: Error_529,
    Error_530: Error_530,
    Error_531: Error_531,
    Error_532: Error_532,
    // Error_533: Error_533
}