import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from '../typeorm/element.entiry';
import { CreateElementDto } from '../dtos/element.dto';

@Injectable()
export class ElementsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {}

  async onApplicationBootstrap() {
    const dataToInsert: CreateElementDto[] = [
      { type: 'button' },
      { type: 'text' },
      { type: 'image' },
    ];
    const newElement = this.elementRepository.create(dataToInsert);
    await this.elementRepository.save(newElement);
  }
}
