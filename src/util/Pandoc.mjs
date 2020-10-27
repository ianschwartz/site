import nodePandoc from "node-pandoc";

export const Pandoc = (pathToFile, options = []) => {
    return new Promise((resolve, reject) => {
        nodePandoc(pathToFile, options, async (err, result) => {
            if (err) console.error(err.message);
            return resolve(result)
        })
    })
}
