import exec from 'executive';
import { getBranch, getDockerImageName, getPackageConfig } from '../utils';

export default async ({ registry, image, tagVersion, tagBranch, tag = [], username = process.env.DOCKER_USERNAME, password = process.env.DOCKER_PASSWORD }) => {
    const tags = [ ...tag ];

    if (tagVersion) {
        tags.push(getPackageConfig().version);
    }

    if (tagBranch) {
        tags.push(getBranch())
    }

    if (username && password) {
        await exec.strict(`docker login --username ${username} --password ${password} ${registry}`);
    }

    return await Promise.all(tags.map(async (tag) => {
        const command = `docker push ${getDockerImageName({ registry, image, tag })}`;
        return await exec.strict(command);
    }));
}
