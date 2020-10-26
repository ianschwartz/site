import fs from 'fs';

export const buildIndex = async () => {
  const posts = await FS.readdir('./src/posts');
  const postsArr = []
  for (const postFilename of posts) {
    const stats = await parsePost(postFilename)
    postsArr.push(stats)
  }
  return postsArr;
}

const parsePost = async (post) => {
  const pathToFile = `./src/posts/${post}`;
  const stats = await FS.stat(pathToFile);
  const body = await FS.readFile(pathToFile);
  const name = post.split('.')[0];
  return {
    createdAt: stats.birthtime,
    editedAt: stats.mtime,
    fileName: name,
    htmlFileName: `./blog/${name}/index.html`,
    pathToFile,
    body
  }
}

export const FS = {
  readdir: (path) => {
    return new Promise((resolve, reject) => {
      return fs.readdir(path, (err, data) => {
        if (err) reject(err);
        resolve(data)
      })
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
  writeFile: (path, data) => {
    return new Promise((resolve, reject) => {
      return fs.writeFile(path, data, (err, res) => {
        if (err) reject(err);
        resolve(res)
      })
    })
  }
}
