import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class masterData {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    MicroWatershedCode: string;

    @Column({ default: '' })
    MicroWatershedName: string;

    @Column({ default: '' })
    SubWatershedCode: string;

    @Column({ default: '' })
    SubWatershedName: string;

    @Column({ default: '' })
    KGISVillageCode: string;

    @Column({ default: '' })
    KGISVillageName: string;

    @Column({ default: '' })
    DistrictCode: string;

    @Column({ default: '' })
    DistrictName: string;

    @Column({ default: '' })
    TalukCode: string;

    @Column({ default: '' })
    TalukName: string;

    @Column({ default: '' })
    HobliCode: string;

    @Column({ default: '' })
    HobliName: string;

    @Column({ default: '' })
    CENSUSVillageCode: string;

    @Column({ default: '' })
    CENSUSVillageName: string;
    
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  