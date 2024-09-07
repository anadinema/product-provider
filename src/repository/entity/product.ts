import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  status: string;

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
    if (this.status == null) {
      this.status = 'INACTIVE';
    }
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.updatedBy = this.createdBy;
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    this.updatedDate = new Date();
  }

}