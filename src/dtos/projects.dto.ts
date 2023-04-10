import { IsNotEmpty, MinLength, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project Id',
    example: 1234,
  })
  @IsNotEmpty()
  @MinLength(3)
  userId: string;

  @ApiProperty({
    description: 'Project Description',
    example: 'Test',
  })
  description: string;

  @ApiProperty({
    description: 'Project Author Name',
    example: 'Or Adar',
  })
  author: string;
}

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Project ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Description of Project',
    example: 'test',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Name of Author',
    example: 'Or Adar',
  })
  @IsOptional()
  author: string;
}
