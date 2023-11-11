import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Schemes } from "./schemes";

@Entity()
export class Sectors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ""})
  SectorName: string;

  @Column({ default: ""})
  SchemeCode: string;

  @Column({ default: ""})
  IsSubScheme: string;

  @Column({ default: ""})
  IsCategory: string;

  @Column({ default: ""})
  IsActivity: string;

  @Column({ default: ""})
  IsSubActivity: string;

  @Column({ default: ""})
  ActivityCode: string;

  @Column({ default: ""})
  SubSchemeCode: string;

  @Column({ default: ""})
  SubActivityCode: string;

  @Column({ default: ""})
  CategoryCode: string;

  @Column({ default: ""})
  UserRole: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // @ManyToOne(() => Schemes, (scheme) => scheme.sectors)
  // scheme: Schemes
}
