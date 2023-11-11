import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { Sectors } from "./sectors";
  
  
  @Entity()
  export class loginData {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;

    @Column({ default: '' })
    UserRole: string;

    @Column({ default: '' })
    Mobile: string;

    @Column({ default: '' })
    Otp: string;

    @Column({ default: '' })
    Token: string;

    @Column({ default: '' })
    Version: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  