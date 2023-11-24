import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class loginData {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;

    @Column({ default: '' })
    UserRole: string;

    @Column({ default: '' })
    Name: string;

    @Column({ default: '' })
    UserCode: string;

    @Column({ default: '' })
    Mobile: string;

    @Column({ default: '' })
    Otp: string;

    @Column({ default: '' })
    WebOtp: string;

    @Column({ default: '' })
    Token: string;

    @Column({ default: '' })
    WebToken: string;

    @Column({ default: '' })
    TokenExpirationTime: string;

    @Column({ default: '' })
    WebTokenExpirationTime: string;

    @Column({ default: '' })
    DistrictCode: string;

    @Column({ default: '' })
    TalukCode: string;

    @Column({ default: '' })
    HobliCode: string;

    @Column({ default: '' })
    Status: string;

    @Column({ default: '' })
    Allotted: string;

    @Column({ default: '', type: 'text' })
    Version: string;

    @Column({ default: '', type: 'text' })
    Assignment: string;

    @Column({ default: '', type: 'text' })
    WebVersion: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  