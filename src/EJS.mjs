import ejs from "ejs";

export const EJS = {
    renderFile: (path, options) => {
        return new Promise((resolve, reject) => {
            ejs.renderFile(path, options,
                undefined,
                async (e, str) => {
                    if (e) console.error(e.message);
                    return resolve(str)
                });
        })
    }
}
