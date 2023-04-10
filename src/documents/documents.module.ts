import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../typeorm/document.entity';
import { DocumentElement } from '../typeorm/document-element.entity';
import { Element } from '../typeorm/element.entiry';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../typeorm/projects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, DocumentElement, Element, Project]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, ProjectsService],
})
export class DocumentsModule {}
