import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saltRounds = 10;

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */
    const { usuario } = req.body.params;
    if (!usuario){
        res.status(400).json({message: "Se necesita un usurio"})
    }
    const { nombre, apellido, email, password } = usuario;
    if (!nombre || !apellido || !email || !password){
        res.status(400).json({message: "Faltan campos por llenar"})
    }
    const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);
    if (usuarioExistente){
        res.status(400).json({message: "Ya existe un usuario con ese email"})
    }
    else{
        try{
            const hashPassword = await bcrypt.hash(password, saltRounds);
            usuario.password = hashPassword;
            await UsuariosService.createUsuario(usuario);
            res.status(201).json({message: "Usuario creado correctamente"})
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }
};

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const { email, password } = req.body.params;
    if (!email || !password){
        res.status(400).json({message: "Se necesita un email y una contraseña"})
    }
    usuario = await UsuariosService.getUsuarioByEmail(email);
    if (!usuario){
        res.status(400).json({message: "Ningún usuario registrado con ese email"})
    }
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto){
        res.status(400).json({message: "Contraseña incorrecta"})
    }
    try{
        const token = jwt.sign(
            { user_id: usuario.id },
            process.env.SECRET,
            { expiresIn: "30m" }
        );
        res.status(200).json({usuario, token}) // devolver usuario y token?
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

export default { register, login };
