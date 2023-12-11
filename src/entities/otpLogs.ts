import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity()
  export class OtpLogs {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    otp: string;
  
    @Column()
    Mobile: string;
  
    @Column()
    Message: string;
  
    @Column()
    Response: string;
  
    @Column()
    UserId: string;
  
    @CreateDateColumn()
    createdDate: Date;
  }
  