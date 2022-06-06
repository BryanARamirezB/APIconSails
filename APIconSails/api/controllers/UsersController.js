/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Users = require("../models/Users");

module.exports = {
  
    getAllUsers: async function (req, res){
        var misUsuarios = await User.find();
        res.ok(misUsuarios);
    },
    //Buscamos parametros
    post: async function(req,res){
        var params = req.allParams();
        //hacemos validaciones
        if(!params.nombre)
            return req.badRequest('El nombre es necesario');
        
        //Hacer la insercion y traer de vuelta lo que incertaste
        //todo proceso de bd es asincrono y hay que esperarlo con await

        /* el fetch tiene dos propostios, traer y actualizar y el segundo es respetar el ciclo de vida
        de un registro

        Si no tienes fecht no tienes un valor devuelto y el ciclo de vida del modelo no funciona*/

        var resUsers = await Users.create(params).fetch();
        return res.ok(resUsers); 
    },
    put: async function(req,res){
      var params = req.allParams();
      var id = params.id;
      delete params.id;
      
      var resUsers = await Users.update({id: id}, params).fetch();
      return res.ok(resUsers);
    },
    delete: async function(req,res){
        var id = req.param('id');
        var resUsers = await Users.destroy({id:id}).fetch();
        return res.ok(resUsers);
    }
};

