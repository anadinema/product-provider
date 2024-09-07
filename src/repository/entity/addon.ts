import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addon')
export class Addon extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  cannotBeCombinedWith: string[];

  @Column('date')
  createdDate: Date;

  @Column()
  createdBy: string;

  @Column('date')
  updatedDate: Date;

  @Column()
  updatedBy: string;

  @BeforeInsert()
  doBeforeInsert() {
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    this.updatedDate = new Date();
  }

}