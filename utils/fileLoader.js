const {glob} = require("glob");
const path = require("path");

async function deleteCachedFiles(file) {
    const filePath = path.resolve(file)
    if (require.cache[filePath]) {
        delete require.cache[filePaht];
    }
}

async function loadFiles(dirName) {
    try {
        const files = await glob(
            path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/")
        );
        const jsFiles = files.filter(file => path.extname(file) === ".js");
        await Promise.all(jsFiles.map(deleteCachedFiles));
        return jsFiles;
    } catch (Error) {
        console.error(`Errors loads modules in folder \npath: ${Error} \nerror: ${Error}`)
        throw Error
    }
}

module.exports = {loadFiles}