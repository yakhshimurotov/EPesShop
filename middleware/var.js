export default function (req, res, next) {
    const isAuths = req.cookies.token ? true : false
    res.locals.token = isAuths;
    next();
};