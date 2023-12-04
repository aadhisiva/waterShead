import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class superAdmin {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;

    @Column({ default: '' })
    UserRole: string;

    @Column({ default: '' })
    Name: string;

    @Column({ default: '' })
    Mobile: string;

    @Column({ default: '' })
    WebOtp: string;

    @Column({ default: '' })
    WebToken: string;

    @Column({ default: '' })
    WebTokenExpirationTime: string;

    @Column({ default: '', type: 'text' })
    WebVersion: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  