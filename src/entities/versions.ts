import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  
  @Entity()
  export class Versions {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    Version: string;

    @Column({ default: '' })
    WebVersion: string;

    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  