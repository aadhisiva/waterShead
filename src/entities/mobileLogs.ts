import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity()
  export class mobileLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;

    @Column({ default: '' })
    Message: string;

    @Column({ default: '' })
    Request: string;

    @Column({ default: '' })
    Response: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  