import { CreateProjectDto, UpdateProjectDto } from './../dtos/projects.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../typeorm/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  createProject(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }

  getProjects() {
    return this.projectRepository.find({ where: { isActive: true } });
  }

  getProjectById(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  deleteProjectById(id: number) {
    return this.projectRepository.update(id, { isActive: false });
  }

  updateProjectById(updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(updateProjectDto.id, updateProjectDto);
  }
}
