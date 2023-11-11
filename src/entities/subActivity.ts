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
export class SubActivity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ''})
  SubActivityName: string;

  @Column({ default: ''})
  CategoryCode: string;

  @Column({ default: ''})
  SectorCode: string;

  @Column({ default: ''})
  SubSchemeCode: string;

  @Column({ default: ""})
  ActivityCode: string;

  @Column({ default: ""})
  SubActivityCode: string;

  @Column({ default: "", type: 'text' })
  TypeOfRefractionist: string;

  @Column({ default: "", type: 'text' })
  TypeOfWork: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
};