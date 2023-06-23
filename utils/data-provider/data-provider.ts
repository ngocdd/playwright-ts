import * as fs from 'fs-extra';

export function readJSONFile(filePath: string): any {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        // console.log(jsonData[0]['choices'][0]);
        return jsonData;
    } catch (error) {
        console.error('Error reading/parsing JSON file:', error);
        throw error;
    }
}
// readJSONFile('./utils/test-data/question.json');
