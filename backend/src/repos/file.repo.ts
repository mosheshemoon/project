import { promises as asyncPromises } from 'fs';
import { UTF_TYPE } from '../constants/constants';

export function readFile(path: string): Promise<string> {
    return asyncPromises.readFile(path, UTF_TYPE);
}

export function writeToFile(path: string, content: string): Promise<void> {
    return asyncPromises.writeFile(path, content, UTF_TYPE);
}
