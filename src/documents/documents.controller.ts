import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from '../dtos/documents.dto';
import { ProjectsService } from '../projects/projects.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentService: DocumentsService,
    private readonly projectService: ProjectsService,
  ) {}

  @Get('id/:id')
  @ApiOkResponse({
    description: 'manage to create document',
    schema: {
      example: {
        id: '19',
        documentName: 'My Doc1',
        createdAt: '2023-04-09T16:14:17.551Z',
        updatedAt: '2023-04-09T16:14:17.551Z',
        isActive: true,
        documentElements: [
          {
            id: '128',
            order: '0',
            createdAt: '2023-04-10T09:16:32.536Z',
            updatedAt: '2023-04-10T09:16:32.536Z',
            element: {
              id: '1',
              type: 'button',
              createdAt: '2023-04-09T14:42:10.945Z',
              updatedAt: '2023-04-09T14:42:10.945Z',
            },
          },
        ],
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Document with id X not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Project with id 7 not found',
        error: 'Not Found',
      },
    },
  })
  async getDocumentById(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentService.getDocumentById(id);
    if (document) {
      return document;
    } else {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'manage to create document',
    schema: {
      example: {
        documentName: 'My Doc2',
        project: {
          id: 1,
        },
        id: '20',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Project is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Project with id 7 not found',
        error: 'Not Found',
      },
    },
  })
  async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    const project = await this.projectService.getProjectById(
      createDocumentDto.projectId,
    );

    if (!project) {
      throw new NotFoundException(
        `Project with id ${createDocumentDto.projectId} not found`,
      );
    }

    const results = await this.documentService.createDocument(
      createDocumentDto,
    );
    return results;
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'manage to create document',
    schema: {
      example: {
        id: 19,
        documentName: 'test',
        elements: [1, 2, 3],
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Document is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Document with id X not found',
        error: 'Not Found',
      },
    },
  })
  async updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    const currentDocument = await this.getDocumentById(updateDocumentDto.id);
    const document = await this.documentService.updateDocumentById(
      currentDocument,
      updateDocumentDto,
    );
    return document;
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'Document deleted',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Document is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Document with id X not found',
        error: 'Not Found',
      },
    },
  })
  @Delete('id/:id')
  async deleteDocumentById(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentService.deleteDocumentById(id);
    if (document.affected) {
      return document;
    } else {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
  }
}
