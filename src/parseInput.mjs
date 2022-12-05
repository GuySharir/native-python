import * as fs from 'fs';
import { Input } from './types.mjs'

export const parseInput = async (input = null) => {
    try {

        if (input !== null) {
            if (typeof input === 'string' && input.endsWith(".json")) {
                const jsonFile = fs.readFileSync(input, 'utf8')
                return new Input(jsonFile)
            }

            else return new Input(JSON.stringify(input))
        }

        return new Input([])

    } catch (error) {
        return new Input("", false)
    };

}