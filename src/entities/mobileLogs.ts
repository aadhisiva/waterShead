import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity()
  export class MobileLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;
  
    @Column({ default: '' })
    Role: string;

    @Column({ default: '' })
    logMessage: string;

    @Column({ default: '' })
    apiMessage: string;

    @Column({ default: '', type:'text' })
    Request: string;

    @Column({ default: '',type:'text' })
    Response: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  