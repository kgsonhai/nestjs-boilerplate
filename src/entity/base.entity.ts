import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @CreateDateColumn({
  //   default: () => `new Date()`,
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   onUpdate: `new Date()`,
  //   default: () => `new Date()`,
  // })
  // modifiedAt: Date;

  // @DeleteDateColumn({
  //   name: 'deletedAt',
  //   default: () => `new Date()`,
  // })
  // deletedAt?: Date;
}
