import { expect } from 'chai';
import { stub } from 'sinon';
import * as commands from '../src/commands';
import docker from '../src/index';

describe('index', () => {
    it('should invoke the command given in the arguments', async () => {
        // setup
        stub(commands, 'build');

        // execute
        await docker(['node', 'some-script.js', 'build']);

        // verify
        expect(commands.build.calledOnce).to.equal(true);

        // clean-up
        commands.build.restore();
    });
    it('should parse arguments', async () => {
        // setup
        commands.foo = stub();

        // execute
        await docker(['node', 'some-script.js', 'foo', 'bar', '--baz']);

        // verify
        expect(commands.foo.args[0][0]._).to.eql(['foo', 'bar']);
        expect(commands.foo.args[0][0].baz).to.equal(true);

        // clean-up
        delete commands.foo;
    });
    it('should throw an error if the command is not found', async () => {
        try {
            // execute
            await docker(['node', 'some-script.js', 'foo', 'bar', '--baz']);
        } catch (e) {
            return;
        }
        expect.fail('an error should have been thrown');
    });
});
