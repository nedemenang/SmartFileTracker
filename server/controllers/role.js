import {Role} from '../models'



export default {

    create(req, res) {
        return Role
            .findOne({
                where: {
                    name: req.body.name
                }
            }).then((roleExists) => {
                if(roleExists){
                    return res.status(400).send({
                        success: false,
                        message: 'Role already exists'
                    });
                }
                return Role
                    .create({
                        name: req.body.name,
                        createdBy: req.body.createdBy
                    })
                    .then((role) => res.status(201).send(role))
                    .catch((error) => res.status(400).send(error))
            });
    },

    list(req, res){
        return Role
            .all({
                where: {
                    isActive: true
                }
            })
            .then((roles) => res.status(200).send(roles))
            .catch((error) => res.status(400).send(error))
    },

    retrieve(req, res) {
        return Role
            .findById(req.params.roleId)
            .then((role) => {
                if(!role){
                    return res.status(404).send({ 
                        message: 'record not found' 
                    });
                }
                return res.status(200).send(role)
            })
            .catch((error) => res.status(400).send(error))
    },

    update(req,res){
        return Role
            .findById(req.params.roleId)
            .then((role) => {
                if(!role){
                    return res.status(404).send({
                        message: 'role not found!'
                    })
                }
                return role
                    .update({
                        name: req.body.name || role.name,
                        isActive: req.body.isActive || role.isActive
                    })
                    .then((role) => res.status(200).send(role))
                    .catch((error) => res.status(400).send(error))
            })
    }
}