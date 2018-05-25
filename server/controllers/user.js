import bcrypt from 'bcrypt';
import {Department} from '../models';
import {User} from '../models';
import {Role} from '../models';
import jwt from 'jsonwebtoken';


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
                        console.log(req.body);
                        return User
                        .create({
                            FirstName: req.body.firstName,
                            LastName: req.body.lastName,
                            UserName: req.body.userName,
                            password: hash,
                            createdBy: req.body.createdBy,
                            role: req.body.role,
                            departmentId: req.body.departmentId
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
    }

}