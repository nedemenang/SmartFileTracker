import bcrypt from 'bcrypt';
import {Department} from '../models';
import {User} from '../models';
import {Role} from '../models';
import jwt from 'jsonwebtoken';
import paginate from '../middleware/paginate'; 


export default {
    
    create(req, res) {
        return User
            .findOne({
                where: {
                    UserName: req.body.userName
                }
            }).then((userNameExists) => {
                if(userNameExists) {
                    return res.status(400).send({
                        success: false,
                        message: 'Username already exists'
                      });
                }
                bcrypt.hash('Password1', 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            message: 'error occurred: ' + err
                        });
                    } else {
                        return User
                        .create({
                            FirstName: req.body.firstName,
                            LastName: req.body.lastName,
                            UserName: req.body.userName,
                            password: hash,
                            createdBy: req.userData.userName,
                            role: req.body.role,
                            departmentId: req.body.department
                        })
                        .then(user => res.status(201).send({
                            success: true,
                            data: user,
                            message: 'User successfully created'
                        }))
                        .catch(error => res.status(400).send(error));
                    }
                })
            })
    },

    list(req, res) {
        return User
            .findAndCountAll()
            .then(users => res.status(200).send({
                success: true, 
                userList: users,
                message: 'users fetched successfully'
            }))
            .catch(error => res.status(400).send(error))
    },

    signIn(req, res) {
        const secret = process.env.SECRET_TOKEN;
        return User.findOne({
            where: {
                UserName: req.body.userName,
                isActive: true
            }
        }).then((user) => {
            if (!user){
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect username or password'
                })
            }
            bcrypt.compare(req.body.userPassword, user.password, (err, result) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
                if (result) {
                  const token = jwt.sign({
                                userName : user.UserName,
                                role: user.role,
                                department: user.departmentId
                            }, secret,
                            {
                                expiresIn: "1h"
                            }
                        );
                    return res.status(200).send({
                        success: true,
                        token: token,
                        user: user,
                        message: 'Authentication successful'
                    })
                }
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed'
                });
            })
        })
    },
    update(req, res) {
        return User
            .findOne({
                where: {
                    UserName: req.body.UserName
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'user Not Found',
                    });
                }
                return user
                    .update({
                        isActive: false
                    })
                    .then((user) => res.status(200).send({
                        user: user,
                        success: true,
                        message: 'user deactivated!' })) 
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    passwordReset(req, res) {
        return User
            .findOne({
                where: {
                    UserName: req.body.userName
                }
            }).then((user) => {
                if(!user) {
                    return res.status(400).send({
                        success: false,
                        message: 'Username does not exist'
                      });
                }
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            message: 'error occurred: ' + err
                        });
                    } else {
                        return user
                            .update({
                                password: hash
                            })
                            .then((user) => res.status(200).send({
                                user: user,
                                success: true,
                                message: 'password successfully updated!' })) 
                            .catch((error) => res.status(400).send(error));
                    }
                })
            })
    }

}