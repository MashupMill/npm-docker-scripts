import gitRepoInfo from 'git-repo-info';
import fs from 'fs';
import path from 'path';

export const getBranch = (gitPath) => {
    return gitRepoInfo(gitPath).branch;
};

export const getPackageConfig = (dir = process.cwd()) => {
    return JSON.parse(fs.readFileSync(path.join(dir, 'package.json')));
};

export const cleanDockerTag = (tag = '') => {
    return tag
    .replace(/[^a-zA-Z\d\.\-_]/gm, '')
    .replace(/^[\.\-]+/gm, '')
    .substr(0, 128);
};

export const getDockerImageName = ({ registry = '', image = '', tag = '' }) => {
    return `${registry}/${image}:${cleanDockerTag(tag)}`
    .replace(/^\//, '')
    .replace(/:$/, '');
};
