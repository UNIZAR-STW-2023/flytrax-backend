async function createUser (req, res)  {

    //var { user, pass } = req.body;
    // logica de login
    //clave = 2212;
    let xlogin = new modelLogin({ email: "fabra", password: "fabra", username: "fabrita" })

    await xlogin.save((error, createUser) => {
        if (error) {
            if (error.code == 11000) {
                responseb.error = true;
                responseb.codigo = 401;
                responseb.mensaje = 'Ya Existe este usuario';
                res.status(401).send({
                    responseb
                });

            } else {
                responseb.error = true;
                responseb.codigo = 304;
                responseb.mensaje = error.code;
                res.status(304).send({
                    responseb
                });

            }

        } else {
           responseb.error = true;
            responseb.codigo = 200;
            responseb.mensaje = {
                id: signup._id,
                tk: token

            };
            res.send({
                responseb
            })
        }
    })
}

module.exports = {
    createUser,
};
