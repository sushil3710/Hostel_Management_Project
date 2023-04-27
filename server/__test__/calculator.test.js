function add(a, b) {
    return a + b;
}

describe('add function', () => {
    it('adds two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
    });

});