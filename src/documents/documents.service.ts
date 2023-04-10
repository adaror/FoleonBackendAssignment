import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Document } from '../typeorm/document.entity';
import { DocumentElement } from '../typeorm/document-element.entity';
import { CreateDocumentDto, UpdateDocumentDto } from '../dtos/documents.dto';
import { Element } from '../typeorm/element.entiry';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(DocumentElement)
    private readonly documentElementRepository: Repository<DocumentElement>,
    @InjectRepository(Element)
    private elementsRepository: Repository<Element>,
  ) {}

  getElementList(elements: number[]): Promise<Element[]> {
    return this.elementsRepository.find({
      where: { id: In(elements) },
    });
  }

  createDocumentElements(
    elements: number[],
    elementsList: Element[],
    document: Document,
  ): DocumentElement[] {
    return elements.map((el, index) => {
      const element = elementsList.find((e) => e.id == el);
      return this.documentElementRepository.create({
        order: index,
        document,
        element,
      });
    });
  }

  async createDocument(createDocumentDto: CreateDocumentDto) {
    const { elements, projectId, ...rest } = createDocumentDto;
    const document = this.documentRepository.create({
      project: { id: projectId },
      ...rest,
    });

    await this.documentRepository.save(document);

    const elementsList = await this.getElementList(elements);

    const documentElements = this.createDocumentElements(
      elements,
      elementsList,
      document,
    );

    await this.documentElementRepository.save(documentElements);
    return document;
  }

  getDocumentById(id: number) {
    return this.documentRepository.findOne({
      where: { id },
      relations: ['documentElements', 'documentElements.element'],
      order: { documentElements: { order: 'ASC' } },
    });
  }

  async updateDocumentById(
    currentDocument: Document,
    document: UpdateDocumentDto,
  ) {
    currentDocument.documentName =
      document.documentName || currentDocument.documentName;
    const elementsList = await this.getElementList(document.elements);

    const documentsElements = this.createDocumentElements(
      document.elements,
      elementsList,
      currentDocument,
    );

    /* I did some switching, I am deleting the old connections and replace to the new ones in order to stay up do date, 
    usually i would prefer to avoid that or use transaction in order to not loose data in case of failure, there are
    more ways to do it, but this is a POC and we can talk about other ways to implement this 
     */

    await this.documentElementRepository.remove(
      currentDocument.documentElements,
    );

    await this.documentRepository.save(currentDocument);
    await this.documentElementRepository.save(documentsElements);

    return document;
  }

  deleteDocumentById(id: number) {
    return this.documentRepository.update(id, { isActive: false });
  }
}
