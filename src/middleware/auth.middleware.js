const { validateToken } = require('../utils/jwt.util')

const checkAuthenticate=async (req,res,next)=>{
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await validateToken(token);
    if (decoded.error) {
      return res.status(401).send(decoded);
    }
    req.user = decoded.data;
    return next();
  }else {
    return res.status(401).send({
      error: 'You are not authorized.'
    });
  }
}
module.exports = {
  checkAuthenticate,
};