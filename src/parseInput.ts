import fs from 'fs';

import { InputType, Input } from './types.js'

export const parseInput = async (type: string, input: any[] = [], filePath: string = ""): Promise<Input> => {

    if (type == InputType.Param) return new Input(JSON.stringify(input))

    if (!filePath.endsWith(".json")) return new Input("", false)

    const jsonFile = fs.readFileSync(filePath, 'utf8')
    // return new Input(JSON.parse(jsonFile))
    return new Input(jsonFile)


}