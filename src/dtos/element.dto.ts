import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateElementDto {
  @IsNotEmpty()
  @IsIn(['button', 'text', 'image'])
  type: string;
}
