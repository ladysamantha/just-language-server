// tslint:disable:ordered-imports
import * as server from "./index";
import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  InitializeParams
} from "vscode-languageserver";

// mock setups

const mockInitializationParams: InitializeParams = {
  capabilities: {},
  processId: 0,
  rootUri: null,
  workspaceFolders: null
};

const mockTextDocumentsManager = {
  listen: jest.fn(),
  onDidOpen: jest.fn(cb => cb({}))
};

const connectionMock = {
  listen: jest.fn(),
  onInitialize: jest.fn(cb => cb(mockInitializationParams))
};

jest.mock("vscode-languageserver");

describe("language server start", () => {
  let result: any;

  beforeAll(() => {
    (createConnection as jest.Mock).mockReturnValue(connectionMock);
    (TextDocuments as jest.Mock<TextDocuments>).mockImplementation(
      () => mockTextDocumentsManager
    );
    result = server.start();
  });

  afterAll(() => {
    (createConnection as jest.Mock).mockClear();
    (TextDocuments as jest.Mock<TextDocuments>).mockClear();
  });

  test("will not return anything", () => {
    expect(result).toBeUndefined();
  });

  test("create the connection", () => {
    expect(createConnection).toHaveBeenCalledWith(ProposedFeatures.all);
    expect(connectionMock.listen).toHaveBeenCalled();
  });

  test("create the text document manager", () => {
    expect(TextDocuments).toHaveBeenCalledWith();
  });
});

describe("language server events", () => {
  beforeAll(() => {
    (createConnection as jest.Mock).mockReturnValue(connectionMock);
    server.start();
  });

  afterAll(() => {
    (createConnection as jest.Mock).mockClear();
  });

  test("onInitialize will be called with initialization params", () => {
    expect(connectionMock.onInitialize).toHaveBeenCalled();
  });

  test("text document manager events", () => {
    expect(mockTextDocumentsManager.listen).toHaveBeenCalledWith(
      connectionMock
    );
    expect(mockTextDocumentsManager.onDidOpen).toHaveBeenCalled();
  });
});
