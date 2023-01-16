import { pathToRegexp } from '../src/regexp';

describe('prever', () => {
  it('regexp', () => {
    const regexp = pathToRegexp('/user/:users/:page?', false);
    expect(regexp.pattern.test('/user/hello/world')).toBeTruthy();
    expect(regexp.pattern.test('/user/hello')).toBeTruthy();
    expect(regexp.pattern.test('/user/hello/world/hello')).toBeFalsy();

    const regexp2 = pathToRegexp('/assets/*', false);
    expect(regexp2.pattern.test('/assets/hello/world')).toBeTruthy();
    expect(regexp2.pattern.test('/assets/')).toBeTruthy();

    const regexp3 = pathToRegexp('/assets/:file.(json|js)', false);
    expect(regexp3.pattern.test('/assets/hello.js')).toBeTruthy();
    expect(regexp3.pattern.test('/assets/hello.json')).toBeTruthy();
    expect(regexp3.pattern.test('/assets/hello.html')).toBeFalsy();
  });
});
