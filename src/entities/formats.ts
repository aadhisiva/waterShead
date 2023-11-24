import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  
  @Entity()
  export class formats {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    QuestionId: string;

    @Column({ default: '' })
    QuestionType: string;

    @Column({ default: '', type: 'text' })
    QuestionValues: string;

    @Column({ default: '' })
    Question: string;

    @Column({ default: '' })
    formateType: string;

    @Column({ default: '' })
    IsApiRequired: string;

    @Column({ default: '' })
    SectorName: string;
    
    @Column({ default: "" })
    TypeOfPerson: string;

    @Column({ default: '' })
    ActivityName: string;

    @Column({ default: '' })
    SubActivityName: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  