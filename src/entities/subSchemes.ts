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
export class SubSchemes {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  SubSchemeName: string;

  @Column({ default: '' })
  CategoryCode: string;

  @Column({ default: '' })
  SectorCode: string;

  @Column({ default: "" })
  IsCategory: string;

  @Column({ default: "" })
  IsActivity: string;

  @Column({ default: "" })
  IsSubActivity: string;

  @Column({ default: "" })
  ActivityCode: string;

  @Column({ default: "" })
  SubSchemeCode: string;

  @Column({ default: "" })
  SubActivityCode: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
};
