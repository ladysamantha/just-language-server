import { Position, TextDocument } from "vscode-languageserver";
import { IValidationService, JustfileValidator } from "./validator";

const mockValidationService: IValidationService = {
  validateText: jest.fn().mockResolvedValue(undefined)
};

const mockJustfile = `
foo:
  bar baz
`;

const mockTextDocument: TextDocument = {
  getText: jest.fn().mockReturnValue(mockJustfile),
  offsetAt(): number {
    return 0;
  },
  positionAt(): Position {
    return {
      character: 0,
      line: 0
    };
  },
  languageId: "",
  lineCount: 0,
  uri: "",
  version: 1
};

describe("Justfile document validator", () => {
  test("constructor works", () => {
    const validator = new JustfileValidator(mockValidationService);
    expect(validator).toBeDefined();
  });

  test("validate will resolve to undefined", async () => {
    const validator = new JustfileValidator(mockValidationService);
    const validationResult = await validator.validate();
    expect(validationResult).toBeUndefined();
  });

  test("validation does not throw when nothing is passed", () => {
    const validator = new JustfileValidator(mockValidationService);
    expect(validator.validate()).resolves.toBeUndefined();
  });

  test("validation service will be called", async () => {
    const validator = new JustfileValidator(mockValidationService);
    await validator.validate(mockTextDocument);
    expect(mockValidationService.validateText).toBeCalledWith(mockJustfile);
  });

  test("TextDocument.getText will be called", async () => {
    const validator = new JustfileValidator(mockValidationService);
    await validator.validate();
    expect(mockTextDocument.getText).toBeCalledWith();
  });
});
