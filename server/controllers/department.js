import { Department } from "../models";
import { User } from "../models";

export default {

    create(req, res) {
        return Department
            .findOne({
                where: {
                    name: req.body.departmentName
                }
            }).then((departmentExists) => {
                if(departmentExists) {
                    return res.status(400).send({
                        success: false,
                        message: 'Department already exists'
                      });
                }
                return Department
                    .create({
                        name: req.body.departmentName,
                        createdBy: req.userData.userName
                    })
                    .then(department => res.status(201).send({
                        success: true,
                        department: department,
                        message: 'Department successfully created'
                    }))
                    .catch(error => res.status(400).send(error));
            })
    },

    list(req, res) {
        return Department
            .all({
                where: {
                    isActive: true
                }
            })
            .then(departments => res.status(200).send({
                success: true, 
                departments: departments,
                message: 'Departments fetched successfully'
            }))
            .catch(error => res.status(400).send(error))
    },

    retrieve(req, res) {
        return Department
            .findById(req.params.departmentId, {
                include: [{
                    model: User,
                    attributes: ['id', 'FirstName', 'LastName', 'UserName'],
                    as: 'Users',
                }],
            })
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }
                return res.status(200).send(department);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Department
            .findById(req.body.deparmentId)
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }
                return department
                    .update({
                        isActive: false
                    })
                    .then((department) => res.status(200).send({
                        department: department,
                        success: true,
                        message: 'Department deactivated!' })) 
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}