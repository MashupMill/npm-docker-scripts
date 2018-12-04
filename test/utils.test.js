import { expect } from 'chai';
import * as utils from '../src/utils';

describe('utils', () => {
    describe('cleanDockerTag', () => {
        it('should strip invalid characters', () => {
            expect(utils.cleanDockerTag('foo:bar;baz1_.-2')).to.equal('foobarbaz1_.-2');
        });
        it('should strip leading periods and dashes', () => {
            expect(utils.cleanDockerTag('.-.--..foo:bar;baz1_.-2')).to.equal('foobarbaz1_.-2');
        });
        it('should strip any characters beyond 128', () => {
            expect(utils.cleanDockerTag('1'.repeat(130)).length).to.equal(128);
        });
    });
    describe('getDockerImageName', () => {
        const registry = 'registry';
        const image = 'image';
        const tag = 'tag';
        it('should concatenate registry, image and tag', () => {
            expect(utils.getDockerImageName({ registry, image, tag })).to.equal('registry/image:tag')
        });
        it('should not include a slash if no registry is provided, image and tag', () => {
            expect(utils.getDockerImageName({ image, tag })).to.equal('image:tag')
        });
        it('should not include a colon if no tag is provided, image and tag', () => {
            expect(utils.getDockerImageName({ image })).to.equal('image')
        });
    });
});
