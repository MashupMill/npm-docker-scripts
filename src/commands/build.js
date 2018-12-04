import exec from 'executive';

export default async ({ path: buildDir = process.cwd(), registry, image, tagVersion, tagBranch, tag }) => {
    console.log('path', buildDir);
    console.log('registry', registry);
    console.log('image', image);
    console.log('tagVersion', tagVersion);
    console.log('tagBranch', tagBranch);
    console.log('tag', tag);

    // docker build
    const tags = tag.map(tag => `--tag ${registry}/${image}:${tag}`).join(' ');
    const { status, stdout, stderr } = await exec.strict(`docker build ${tags} .`, { cwd: path });


}
