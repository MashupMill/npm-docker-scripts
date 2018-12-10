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

    const results = [];
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const fullName = getDockerImageName({registry, image, tag});
        const command = `docker push ${fullName}`;
        try {
            results.push(await exec.strict(command));
        } catch (e) {
            console.error(`Failed to push ${fullName}`);
            throw e;
        }
    }
    return results;
}
