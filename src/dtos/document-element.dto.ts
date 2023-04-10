import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDocumentElementDto {
  @IsNotEmpty()
  @IsNumber()
  documentId: number;

  @IsNotEmpty()
  @IsNumber()
  elementId: number;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
