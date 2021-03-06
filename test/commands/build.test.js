import exec from 'executive';
import { createSandbox } from 'sinon';
import { expect } from 'chai';
import * as utils from '../../src/utils';
import { build } from '../../src/commands';

describe('build', () => {
    const sandbox = createSandbox();
    const registry = 'hub.docker.com';
    const image = 'foo';
    const tag = ['latest'];
    beforeEach(() => {
        sandbox.stub(exec, 'strict').returns({ status: 0, stdout: '', stderr: '' });
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should execute a command', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.calledOnce).to.equal(true);
    });
    it('should execute the command in the given working directory', async () => {
        await build({ dockerfilePath: __dirname, registry, image, tag });
        expect(exec.strict.args[0][1].cwd).to.equal(__dirname);
    });
    it('should execute a "docker build" command', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.match(/docker build .*/);
    });
    it('should include the tag info', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.equal(`docker build --tag ${registry}/${image}:${tag[0]} .`);
    });
    it('should throw an error if the status code is not 0', async () => {
        exec.strict.throws({ status: 1 });
        try {
            await build({ registry, image, tag: [], tagVersion: true });
        } catch (e) {
            return;
        }
        expect.fail('should have thrown an error');
    });
    it('should include a version tag when tagVersion is set to true', async () => {
        sandbox.stub(utils, 'getPackageConfig').returns({ version: '1.0.0' });
        await build({ registry, image, tag: [], tagVersion: true });
        expect(exec.strict.args[0][0]).to.equal(`docker build --tag ${registry}/${image}:1.0.0 .`);
    });
    it('should include a branch tag when tagBranch is set to true', async () => {
        sandbox.stub(utils, 'getBranch').returns('foo');
        await build({ registry, image, tag: [], tagBranch: true });
        expect(exec.strict.args[0][0]).to.equal(`docker build --tag ${registry}/${image}:foo .`);
    });
});
