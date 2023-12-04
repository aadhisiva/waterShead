import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity()
  export class webLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;
  
    @Column({ default: '' })
    Role: string;

    @Column({ default: '' })
    Message: string;

    @Column({ default: '', type: 'text' })
    Request: string;

    @Column({ default: '', type: 'text' })
    Response: string;

    @Column({ default: '' })
    ResponseType: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  