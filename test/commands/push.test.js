import exec from 'executive';
import { createSandbox } from 'sinon';
import { expect } from 'chai';
import * as utils from '../../src/utils';
import { push } from '../../src/commands';

describe('push', () => {
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
        await push({ registry, image, tag });
        expect(exec.strict.calledOnce).to.equal(true);
    });
    it('should execute a "docker push" command', async () => {
        await push({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.match(/docker push .*/);
    });
    it('should include the tag info', async () => {
        await push({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.equal(`docker push ${registry}/${image}:${tag[0]}`);
    });
    it('should execute a "docker login" command when providing a username and password', async () => {
        await push({ registry, image, tag, username: 'anonymous', password: 'anonymous' });
        expect(exec.strict.args[0][0]).to.equal(`docker login --username anonymous --password anonymous ${registry}`);
    });
    it('should throw an error if the status code is not 0', async () => {
        exec.strict.throws({ status: 1 });
        try {
            const result = await push({ registry, image, tag: [], tagVersion: true });
            console.log(result);
        } catch (e) {
            return;
        }
        expect.fail('should have thrown an error');
    });
    it('should include a version tag when tagVersion is set to true', async () => {
        sandbox.stub(utils, 'getPackageConfig').returns({ version: '1.0.0' });
        await push({ registry, image, tag: [], tagVersion: true });
        expect(exec.strict.args[0][0]).to.equal(`docker push ${registry}/${image}:1.0.0`);
    });
    it('should include a branch tag when tagBranch is set to true', async () => {
        sandbox.stub(utils, 'getBranch').returns('foo');
        await push({ registry, image, tag: [], tagBranch: true });
        expect(exec.strict.args[0][0]).to.equal(`docker push ${registry}/${image}:foo`);
    });
});
