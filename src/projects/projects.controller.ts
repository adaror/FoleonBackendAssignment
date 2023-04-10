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
import { CreateProjectDto, UpdateProjectDto } from '../dtos/projects.dto';
import { ProjectsService } from './projects.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Retrieve all the projects',
    schema: {
      example: [
        {
          id: '1',
          userId: '1',
          description: 'test',
          author: 'Or Adar',
          createdAt: '2023-04-09T12:21:07.734Z',
          updatedAt: '2023-04-09T12:21:07.734Z',
          isActive: true,
        },
      ],
    },
  })
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get('id/:id')
  @ApiOkResponse({
    description: 'Retrieve all the projects',
    schema: {
      example: {
        id: '1',
        userId: '1',
        description: 'test',
        author: 'Or Adar',
        createdAt: '2023-04-09T12:21:07.734Z',
        updatedAt: '2023-04-09T12:21:07.734Z',
        isActive: true,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Project is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Project with id X not found',
        error: 'Not Found',
      },
    },
  })
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectService.getProjectById(id);
    if (project) {
      return project;
    } else {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'Retrieve all the projects',
    schema: {
      example: {
        userId: '1234',
        description: null,
        author: null,
        id: '4',
        createdAt: '2023-04-10T10:17:00.443Z',
        updatedAt: '2023-04-10T10:17:00.443Z',
        isActive: true,
      },
    },
  })
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'Retrieve all the projects',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Project is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Project with id X not found',
        error: 'Not Found',
      },
    },
  })
  async updateProjectById(@Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectService.updateProjectById(
      updateProjectDto,
    );

    if (project.affected) {
      return project;
    } else {
      throw new NotFoundException(
        `Project with id ${updateProjectDto.id} not found`,
      );
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'Project deleted',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Project is not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Project with id X not found',
        error: 'Not Found',
      },
    },
  })
  async deleteProjectById(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectService.deleteProjectById(id);
    if (project.affected) {
      return project;
    } else {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  }
}
