import * as fs from 'fs';

import { InputType, Input } from './types.mjs'

export const parseInput = async (type, input = [], filePath = "") => {

    if (type === InputType.Param) return new Input(JSON.stringify(input))

    if (!filePath.endsWith(".json")) return new Input("", false)

    const jsonFile = fs.readFileSync(filePath, 'utf8')
    return new Input(jsonFile)

}