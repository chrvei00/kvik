//ErrorClass
module.exports.eError = class eError extends Error {
  constructor(msg, code) {
    super();
    this.msg = msg;
    this.code = code;
  }
};

//Error-handler
module.exports.catchError = (err, req, res, next) => {
  if (!err.msg) err.msg = "Error";
  if (!err.code) err.code = 505;
  console.log(err.msg, err.code);
  res.status(err.code).render("./error/template.ejs", { error: err });
};

//Async handler
module.exports.catchAsync = function (func) {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
