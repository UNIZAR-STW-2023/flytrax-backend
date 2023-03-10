function servirRoot(req, res, next) {
    res.status(200).send('Sirviendo el root');
  }

  
module.exports = {
    servirRoot,
};

