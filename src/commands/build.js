import exec from 'executive';
import { getBranch, getDockerImageName, getPackageConfig } from '../utils';

export default async ({ dockerfilePath = process.cwd(), registry, image, tagVersion, tagBranch, tag = [] }) => {
    const tags = [ ...tag ];

    if (tagVersion) {
        tags.push(getPackageConfig().version);
    }

    if (tagBranch) {
        tags.push(getBranch())
    }

    const tagParams = tags.map(tag => `--tag ${getDockerImageName({ registry, image, tag })}`).join(' ');
    const command = `docker build ${tagParams} .`;
    return await exec.strict(command, { cwd: dockerfilePath });
}
