import UsuariosService from "../services/usuarios.service.js";

const makeadmin = async (req, res) => {
    const userID = parseInt(req.params.id);
    if (!userID){
        return res.status(400).send({message: "Se necesita ID"});
    }
    try{
        const usuario = UsuariosService.getUsuarioById(userID);
        if(!usuario){
            return res.status(404).send({message: "Usuario no encontrado"});
        }
        await UsuariosService.makeUserAdmin(userID);
        return res.status(200).send({message: "Usuario hecho admin correctamente"});
    }
    catch (error){
        return res.status(500).send({error: error.message})
    }
};

export default { makeadmin };
