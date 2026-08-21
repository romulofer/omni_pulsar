const themeName = 'omni-pulsar-syntax';

describe(`${themeName} theme`, () => {
  it('activates without throwing', () => {
    waitsForPromise(() => atom.packages.activatePackage(themeName));

    runs(() => {
      expect(atom.packages.isPackageActive(themeName)).toBe(true);
    });
  });
});
