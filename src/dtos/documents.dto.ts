import { IsNotEmpty, IsNumber, IsArray, IsIn, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'Id of project',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty({
    description: 'Document name',
    example: 'test',
  })
  @IsNotEmpty()
  documentName: string;

  @ApiProperty({
    description:
      'List of element - for this example list of elements codes 1,2 or 3',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsIn([1, 2, 3], { each: true })
  elements: number[];
}

export class UpdateDocumentDto {
  @ApiProperty({
    description: 'Document Id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Document Name',
    example: 'test',
  })
  documentName: string;

  @ApiProperty({
    description: 'Array of elements type codes',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsIn([1, 2, 3], { each: true })
  elements: number[];
}
