import { expect } from 'chai';
import { stub } from 'sinon';
import * as commands from '../src/commands';
import docker from '../src/index';

describe('index', () => {
    it('should invoke the command given in the arguments', () => {
        // setup
        commands.foo = stub();

        // execute
        docker(['node', 'some-script.js', 'foo']);

        // verify
        expect(commands.foo.calledOnce).to.equal(true);

        // clean-up
        delete commands.foo;
    });
    it('should parse arguments', () => {
        // setup
        commands.foo = stub();

        // execute
        docker(['node', 'some-script.js', 'foo', 'bar', '--baz']);

        // verify
        expect(commands.foo.args[0][0]._).to.eql(['foo', 'bar']);
        expect(commands.foo.args[0][0].baz).to.equal(true);

        // clean-up
        delete commands.foo;
    });
});
