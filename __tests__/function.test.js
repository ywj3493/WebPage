const testAddFunction = (a, b) => {
  return a + b;
};

describe("simple test", () => {
  beforeEach(() => {
    temp = true;
  });
  afterEach(() => {
    temp = false;
  });
  test("1 is 1", () => {
    expect(1).toBe(1);
  });
  test("temp is true", () => {
    expect(temp).toBe(true);
  });
  test("testAddFunction(1,1) = 2", () => {
    expect(testAddFunction(1, 1)).toBe(2);
  });
});
