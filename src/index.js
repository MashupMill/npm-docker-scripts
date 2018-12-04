import yargs from 'yargs';
import path from 'path';
import * as commands from './commands';

const NO_COMMAND = async () => (console.log('Unknown command'));
const DEFAULT_CONFIG = {};

export default async (args) => {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    const dockerConfig = { ...DEFAULT_CONFIG, ...pkg.dockerConfig };
    const parsedArgs = yargs(args.slice(2))
    .help()
    .option('r', {
        alias: 'registry',
        default: dockerConfig.registry,
        describe: 'Docker registry to push to',
        type: 'string'
    })
    .option('i', {
        alias: 'image',
        default: dockerConfig.image,
        describe: 'Docker image name',
        type: 'string'
    })
    .command('build', 'Build a docker image', yargs => (
            yargs
            .option('b', {
                alias: 'tag-branch',
                default: false,
                describe: 'Whether we tag with the branch name'
            })
            .option('v', {
                alias: 'tag-version',
                default: false,
                describe: 'Whether we tag with the version'
            })
            .option('t', {
                alias: 'tag',
                default: ['latest'],
                describe: 'List of tags that we should apply',
                type: 'array'
            })
    ))
    .command('push', 'Push a docker image')
    .argv;
    const cmd = commands[parsedArgs._[0]] || NO_COMMAND;
    await cmd(parsedArgs);
};
