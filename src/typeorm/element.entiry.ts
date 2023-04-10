import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentElement } from './document-element.entity';

@Entity()
export class Element {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'element_id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'type',
    nullable: false,
  })
  type: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    nullable: false,
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: false,
    default: new Date(),
  })
  updatedAt: Date;

  @OneToMany(
    () => DocumentElement,
    (documentElement) => documentElement.element,
  )
  documentElements: DocumentElement[];
}
