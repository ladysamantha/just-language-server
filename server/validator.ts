import { TextDocument } from "vscode-languageserver";

export interface IValidationService {
  validateText(textContent: string): Promise<any>;
}

export class JustfileValidator {
  constructor(private service: IValidationService) {}

  public async validate(textDocument?: TextDocument): Promise<void> {
    if (!textDocument) {
      return;
    }
    const rawText = textDocument.getText();
    await this.service.validateText(rawText);
    return Promise.resolve();
  }
}
