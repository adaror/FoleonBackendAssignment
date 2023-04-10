import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Project } from '../typeorm/projects.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/projects.dto';

const MOCK_PROJECT_CREATE_DTO: CreateProjectDto = {
  userId: '12345',
  description: 'test',
  author: 'test',
};

const MOCK_PROJECT_UPDATE_DTO: UpdateProjectDto = {
  id: 1,
  description: 'test2',
  author: 'test',
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectsRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {
            get: jest.fn(),
            create: jest.fn((project: CreateProjectDto) => {
              return {
                id: 1,
                description: project.description,
                userId: project.userId,
                author: project.author,
              };
            }),
            save: jest.fn((project: UpdateProjectDto) => {
              return {
                id: 1,
                description: project.description,
                author: project.author,
              };
            }),
            findOne: jest.fn((id: number) => {
              return { id, userId: 'test', description: '', author: '' };
            }),
            find: jest.fn(() => {
              return [new Project(), new Project()];
            }),
            update: jest.fn((id: number, project: UpdateProjectDto) => {
              const mock = { ...MOCK_PROJECT_CREATE_DTO };
              mock.description = project.description;
              return mock;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectsRepository = module.get<Repository<Project>>(
      PROJECT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('projectsRepository should be define', () => {
    expect(projectsRepository).toBeDefined();
  });

  describe('getProjects', () => {
    it('should retrieve array with a list of all of the projects', async () => {
      const results = await service.getProjects();
      expect(results).toHaveLength(2);
      expect(projectsRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProjectById', () => {
    it('should return single project', async () => {
      const results = await service.getProjectById(1);
      expect(results).toHaveProperty('id');
    });
  });

  describe('createProject', () => {
    it('should create and returned new project', async () => {
      const results = await service.createProject(MOCK_PROJECT_CREATE_DTO);
      expect(results).toHaveProperty('id');
    });
  });

  describe('updateProjectById', () => {
    it('should update attribute in project', async () => {
      const results = await service.updateProjectById(MOCK_PROJECT_UPDATE_DTO);
      expect(results).toHaveProperty('description', 'test2');
    });
  });
});
