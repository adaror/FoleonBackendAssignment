import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from './document.entity';
import { Element } from './element.entiry';

@Entity()
export class DocumentElement {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'order',
    nullable: false,
  })
  order: number;

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

  @ManyToOne(() => Document, (document) => document.documentElements, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  document: Document;

  @ManyToOne(() => Element, (element) => element.documentElements, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  element: Element;
}
