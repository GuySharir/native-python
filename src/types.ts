
export const InputType = {
    Param: 'Param',
    File: 'File'
}


export class Input {
    valid: boolean;
    data: string;

    constructor(data: string, valid: boolean = true) {
        this.data = data;
        this.valid = valid;
    }
}

export type Response = {
    data?: Array<any>,
    error?: string
}