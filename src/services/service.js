
// response for success 

exports.RES = (res, data, status) => {

    return res.json({
        success: true,
        data,
        status
    });
}

// response for error

exports.REE = (res, data, status) => {

    return res.json({
        success: false,
        data,
        status
    });
}


