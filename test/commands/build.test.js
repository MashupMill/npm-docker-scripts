import exec from 'executive';
import { stub } from 'sinon';
import { expect } from 'chai';
import { build } from '../../src/commands';

describe('build', () => {
    const registry = 'hub.docker.com';
    const image = 'foo';
    const tag = ['latest'];
    beforeEach(() => {
        stub(exec, 'strict').returns({ status: 0, stdout: '', stderr: '' });
    });
    afterEach(() => {
        exec.strict.restore();
    });
    it('should execute a command', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.calledOnce).to.equal(true);
    });
    it('should execute a "docker build" command', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.match(/docker build .*/);
    });
    it('should include the tag info', async () => {
        await build({ registry, image, tag });
        expect(exec.strict.args[0][0]).to.equal(`docker build --tag ${registry}/${image}:${tag[0]} .`);
    });
});
