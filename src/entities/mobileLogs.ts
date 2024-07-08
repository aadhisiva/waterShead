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
  
    @Column({ default: '', type: 'nvarchar', nullable:true })
    UserId: string;
  
    @Column({ default: '', type: 'nvarchar', nullable:true })
    Role: string;

    @Column({ default: '', type: 'nvarchar', nullable:true })
    logMessage: string;

    @Column({ default: '', type: 'nvarchar', nullable:true })
    apiMessage: string;

    @Column({ default: '', type:'text' })
    Request: string;

    @Column({ default: '',type:'text' })
    Response: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  