import { NotImplementedError } from "../not-implemented-error";

describe("NotImplementedError", () => {
  it("has correct message", () => {
    const x = new NotImplementedError();
    expect(new NotImplementedError().message).toStrictEqual("Not Implemented");
    expect(new NotImplementedError().name).toStrictEqual("NotImplementedError");
  });
});
