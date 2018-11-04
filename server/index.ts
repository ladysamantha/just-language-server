import {
  createConnection,
  InitializeParams,
  ProposedFeatures,
  TextDocumentChangeEvent,
  TextDocuments
} from "vscode-languageserver";

export const start = () => {
  const connection = createConnection(ProposedFeatures.all);
  const documents = new TextDocuments();

  documents.onDidOpen((event: TextDocumentChangeEvent) => {
    return;
  });
  documents.listen(connection);

  connection.onInitialize((params: InitializeParams) => {
    return {
      capabilities: {
        // Tell the client that the server supports code completion
        completionProvider: {
          resolveProvider: true
        },
        textDocumentSync: documents.syncKind
      }
    };
  });

  connection.listen();
};
