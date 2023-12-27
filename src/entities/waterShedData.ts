import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity({name: "WaterShedData"})
  export class WaterShedData {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    UserId: string;
  
    @Column({ default: '', type: 'nvarchar', length: 'max' })
    UserRole: string;

    @Column({ default: '', type: 'nvarchar', length: 'max' })
    Latitude: string;

    @Column({ default: '', type: 'nvarchar', length: 'max' })
    Longitude: string;

    @Column({ default: '', type: 'nvarchar', length: 'max' })
    CoOrdinatesType: string;

    @Column({ default: '', type: 'text' })
    FieldPhoto: string;

    @Column({ default: '', type: 'nvarchar', length: 'max' })
    CapturedPhotoType: string;

    @CreateDateColumn()
    CreatedDate: Date;

    @Column({ default: '', type: 'nvarchar', length: 'max'  })
    CreatedBy: String;

    @Column({ default: '', type: 'nvarchar', length: 'max' })
    UpdatedBy: String;

    @Column({ default: '' })
    Status: String;

    @CreateDateColumn()
    UpdatedDate: Date;
  };
  