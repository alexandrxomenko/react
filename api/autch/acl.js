const Roles = {
    GUEST: 'GUEST',
    USER: 'USER',
    ADMIN: 'ADMIN'
};



const allowRoles= function (role) {
    return function (req, res, next) {
        const roles = [].concat(role);

        // console.log(req.user.roles)
        if(!req.user || !roles.includes(req.user.roles)){
            next( new Error('Permission denied'))
        }
        next()
    }
};

const disallowRoles = function(role) {
    return function(req, res, next) {
        const roles = [].concat(role);

        if(!req.user || roles.includes(req.user.role)) {
            next( new Error('Permission denied') )
        }
        next()
    }
};


module.exports = { allowRoles, disallowRoles, Roles };