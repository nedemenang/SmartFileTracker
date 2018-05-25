import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateLoginInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.userName)) {
        errors.userName = 'This field is required';
    }
    if (Validator.isEmpty(inputData.userPassword)) {
        errors.userPassword = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


export function validateFileInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.fileNo)) {
        errors.fileNo = 'This field is requiredd';
    }
    if (Validator.isEmpty(inputData.fileName)) {
        errors.fileName = 'This field is required';
    }
    if (Validator.isEmpty(inputData.fileDescription)) {
        errors.fileDescription = 'This field is required';
    }
    if (Validator.isEmpty(inputData.fileLink)) {
        errors.fileLink = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateUserInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.firstName)) {
        errors.firstName = 'This field is required';
    }
    if (Validator.isEmpty(inputData.lastName)) {
        errors.lastName = 'This field is required';
    }
    if (Validator.isEmpty(inputData.userName)) {
        errors.userName = 'This field is required';
    }
    if (Validator.isEmpty(inputData.role)) {
        errors.role = 'This field is required';
    }
    if (Validator.isEmpty(inputData.department)) {
        errors.department = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateFileNoteInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.fileNote)) {
        errors.fileNote = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateFileMovementInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.movedToDepartment)) {
        errors.movedToDepartment = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


export function validateDepartmentInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.departmentName)) {
        errors.departmentName = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}