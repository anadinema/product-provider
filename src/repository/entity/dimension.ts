import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dimension')
export class Dimension {

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  rangeFrom: number;

  @Column()
  rangeTo: number;

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