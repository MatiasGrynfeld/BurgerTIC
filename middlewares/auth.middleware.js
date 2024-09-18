import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return res.status(401).send({error: "Unauthorized"});
        }
        const parts = authorizationHeader.split(" ");
        const type = parts[0]
        const token = parts[1]
        if(type !== "Bearer"){
            return res.status(401).send({error: "Unauthorized"});
        }
        const payload = jwt.verify(token, process.env.SECRET);
        if(!payload.id){
            return res.status(401).send({error: "Unauthorized"});
        }
        req.id = payload.id;
        next();
    }
    catch(error){
        return res.status(401).send({error: "Unauthorized"});
    }
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
    try{
        const id_usuario = req.id;
        const usuario = await UsuariosService.getUsuarioById(id_usuario);
        if(usuario.admin === true){
            next();
        }
        else{
            return res.status(403).send({error: "Forbidden"});
        }
    }
    catch(error){
        return res.status(403).send({error: "Forbidden"});
    }
};