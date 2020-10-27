import fs from "fs";

export const FS = {
    readdir: (path) => {
        return new Promise((resolve, reject) => {
            return fs.readdir(path, (err, data) => {
                if (err) reject(err);
                resolve(data)
            })
        })
    },
    mkdir: (path) => {
      const pathArr = path.split('/')
      const _ = pathArr.pop();

      const newPath = pathArr.join('/');

      return new Promise((resolve, reject) => {
        if (!fs.existsSync(newPath)) {
                return fs.mkdir(newPath, (err, data) => {
                    if (err) console.error(err.message);
                    resolve(data)
                })
            }
        resolve();
        })
    },
    readFile: (path) => {
        return new Promise((resolve, reject) => {
            return fs.readFile(path, 'utf-8', (err, data) => {
                if (err) reject(err);
                resolve(data)
            })
        })
    },
    stat: (path) => {
        return new Promise((resolve, reject) => {
            return fs.stat(path, (err, data) => {
                if (err) reject(err);
                resolve(data)
            })
        })
    },
    exists: (args) => {
        return fs.existsSync(args)
    },
    writeFile: (path, data) => {
      console.log(path)
        return new Promise((resolve, reject) => {
            return fs.writeFile(path, data, (err, res) => {
                if (err) console.error(err);
                resolve(res)
            })
        })
    },
}
