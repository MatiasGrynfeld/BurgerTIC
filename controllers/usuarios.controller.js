import UsuariosService from "../services/usuarios.service.js";

const makeadmin = async (req, res) => {
    const userID = req.body;
    if (!userID){
        return res.status(400).send({message: "Se necesita ID"});
    }
    try{
        await UsuariosService.makeUserAdmin(userID.id);
        return res.status(200).send({message: "Usuario hecho admin correctamente"});
    }
    catch (error){
        return res.status(500).send({error: error.message})
    }
};

export default { makeadmin };
