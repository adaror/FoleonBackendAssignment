import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { Document } from '../typeorm/document.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto, UpdateDocumentDto } from '../dtos/documents.dto';
import { DocumentElement } from '../typeorm/document-element.entity';
import { Element } from '../typeorm/element.entiry';

const MOCK_RESPONSE_DOCUMENT = {
  id: '1',
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
};

const MOCK_CREATE_DOCUMENT_DTO: CreateDocumentDto = {
  projectId: 1,
  documentName: 'test',
  elements: [1, 2, 3],
};

const MOCK_UPDATE_DOCUMENT_DTO: UpdateDocumentDto = {
  id: 1,
  documentName: 'test',
  elements: [1, 2, 3],
};

describe('DocumentsService', () => {
  let service: DocumentsService;
  let documentsRepository: Repository<Document>;
  let documentElementRepository: Repository<DocumentElement>;
  let elementRepository: Repository<Element>;
  const DOCUMENTS_REPOSITORY_TOKEN = getRepositoryToken(Document);
  const DOCUMENT_ELEMENT_REPOSITORY_TOKEN = getRepositoryToken(DocumentElement);
  const ELEMENT_REPOSITORY_TOKEN = getRepositoryToken(Element);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: DOCUMENTS_REPOSITORY_TOKEN,
          useValue: {
            get: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn((id: number) => {
              return MOCK_RESPONSE_DOCUMENT;
            }),
            save: jest.fn((document: Document) => {
              return new Document();
            }),
          },
        },
        {
          provide: DOCUMENT_ELEMENT_REPOSITORY_TOKEN,
          useValue: {
            get: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            remove: jest.fn((el) => {
              return true;
            }),
          },
        },
        {
          provide: ELEMENT_REPOSITORY_TOKEN,
          useValue: {
            get: jest.fn(),
            find: jest.fn(() => {
              return [new Element(), new Element()];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    documentsRepository = module.get<Repository<Document>>(
      DOCUMENTS_REPOSITORY_TOKEN,
    );
    documentElementRepository = module.get<Repository<DocumentElement>>(
      DOCUMENTS_REPOSITORY_TOKEN,
    );
    elementRepository = module.get<Repository<Element>>(
      ELEMENT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('documentsRepository should be define', () => {
    expect(documentsRepository).toBeDefined();
  });

  it('documentElementRepository should be define', () => {
    expect(documentsRepository).toBeDefined();
  });

  it('elementRepository should be define', () => {
    expect(documentsRepository).toBeDefined();
  });

  describe('getDocumentById', () => {
    it('should retrieve documents with list of elements', async () => {
      const results = await service.getDocumentById(1);
      expect(results).toHaveProperty('id', '1');
      expect(results.documentElements).toHaveLength(1);
    });
  });

  describe('createDocument', () => {
    it('should create document and return it data', async () => {
      await service.createDocument(MOCK_CREATE_DOCUMENT_DTO);
      expect(documentsRepository.save).toBeCalledTimes(1);
      expect(elementRepository.find).toBeCalledTimes(1);
      expect(documentElementRepository.save).toBeCalledTimes(1);
    });
  });

  describe('updateDocumentById', () => {
    it('should update document and it elements', async () => {
      await service.updateDocumentById(
        new Document(),
        MOCK_UPDATE_DOCUMENT_DTO,
      );
      expect(documentElementRepository.save).toBeCalledTimes(1);
      expect(elementRepository.find).toBeCalledTimes(1);
      expect(documentsRepository.save).toBeCalledTimes(1);
    });
  });
});
