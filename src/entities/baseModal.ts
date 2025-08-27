import { BaseEntity, BeforeInsert, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import dataSource from '../config/db';

export abstract class BaseModal extends BaseEntity {
  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column({ default: false, select: false })
  isDeleted: boolean;
}

export abstract class ISequence extends BaseModal {
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  async generateUniqueNumber() {
    const repository = dataSource.getRepository(this.constructor);
    const lastRecord = await repository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    let newId = 1;

    if (lastRecord.length > 0) {
      const lastId = lastRecord[0].id;
      newId = lastId + 1;
    }
    this.id = newId;
  }
}