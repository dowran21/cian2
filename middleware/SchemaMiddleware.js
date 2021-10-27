const SchemaMiddleware = (schema) => { 
    return async (req, res, next) => { 
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error == null) { 
        next(); 
      } else { 
        const { details } = error;
        let resp = [];
        details.forEach(item => {
          let err = {
            type:"manual",
          }
          err["name"] = item.path[0];
          err["message"] = item.message
          resp = resp.concat(err)
        });
        console.log(resp);
        res.status(301).json({ error: resp }) 
      } 
    }
  };

module.exports = {
    SchemaMiddleware,
}