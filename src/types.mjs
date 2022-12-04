
export const InputType = {
    Param: 'Param',
    File: 'File'
}


export class Input {
    valid;
    data;

    constructor(data, valid = true) {
        this.data = data;
        this.valid = valid;
    }
}
