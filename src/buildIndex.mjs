import {FS} from "./util/FS.mjs";

export const buildIndex = async () => {
  const posts = await FS.readdir('./src/posts');
  const postsArr = []
  for (const postFilename of posts) {
    if (postFilename.includes('.md')) {
      const stats = await parsePost(postFilename)
      postsArr.push(stats)
    }
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

