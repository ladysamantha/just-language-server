import * as server from "./index";

describe("sample", () => {
  it("will call console.log", () => {
    // tslint:disable-next-line:no-empty
    const spy = jest.spyOn(global.console, "log").mockImplementation(() => {});
    server.foo();
    expect(spy).toBeCalledWith("Hello, World!");
  });
});
