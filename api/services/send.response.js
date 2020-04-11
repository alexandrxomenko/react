exports.sendResponse = (res, resDb, resStatus = undefined) => {
    let status ;

    if(typeof resDb === 'undefined'){
        status = {code: 400, message: 'error'}
    }else{
        if (typeof resDb !== 'undefined' || resDb.length) {
            status = {code: 200, message: 'success'};

            if (resStatus) {
                status.code = resStatus;
            }
            if (resDb.code) {
                status.code = resDb.code
            }
            if (resDb.message) {
                status.message = resDb.message;
                delete resDb.message
            }
        } else {
            status = {code: 400}
        }
    }

    res.status(status.code)
        .json({
            data: resDb,
            message: status.message
        })
};