import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateLoginInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.userName)) {
        errors.userName = 'This field required';
    }
    if (Validator.isEmpty(inputData.userPassword)) {
        errors.userPassword = 'This field required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


export function validateFileInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.fileNo)) {
        errors.fileNo = 'This field required';
    }
    if (Validator.isEmpty(inputData.fileDescription)) {
        errors.fileDescription = 'This field required';
    }
    if (Validator.isEmpty(inputData.fileLink)) {
        errors.fileLink = 'This field required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateFileNoteInput(inputData) {
    const errors = {};
    if (Validator.isEmpty(inputData.fileNote)) {
        errors.fileNo = 'This field required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}