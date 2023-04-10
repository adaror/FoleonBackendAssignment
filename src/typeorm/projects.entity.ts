import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'project_id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'user_id',
    nullable: false,
    default: '',
  })
  userId: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    type: 'text',
    name: 'author',
    nullable: true,
    default: null,
  })
  author: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    nullable: false,
    default: new Date(),
  })
  createdAt: Date;

  @Column({
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

  @OneToMany(() => Document, (document) => document.project)
  documents: Document[];
}
