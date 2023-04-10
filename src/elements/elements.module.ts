import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from '../typeorm/element.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([Element])],
  providers: [ElementsService],
})
export class ElementsModule {}
