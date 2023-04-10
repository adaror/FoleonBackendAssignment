import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './projects.entity';
import { DocumentElement } from './document-element.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'document_id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'name',
    nullable: false,
    default: '',
  })
  documentName: string;

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

  @Column({
    type: 'boolean',
    name: 'is_active',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Project, (project) => project.documents, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  project: Project;

  @OneToMany(
    () => DocumentElement,
    (documentElement) => documentElement.document,
  )
  documentElements: DocumentElement[];
}
