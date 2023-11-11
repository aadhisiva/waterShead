import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Sectors } from "./sectors";

@Entity()
export class Schemes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ""})
  SchemeName: string;

  @Column({ default: ""})
  SchemeCode: string;
  
  @Column({ default: ""})
  IsSubScheme: string;
  
  @Column({ default: ""})
  IsSector: string;

  @Column({ default: ""})
  IsCategory: string;

  @Column({ default: ""})
  IsActivity: string;

  @Column({ default: ""})
  IsSubActivity: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // @OneToMany(() => Sectors, (sector) => sector.SchemeCode)
  // @JoinColumn()
  // sectors: Sectors[]
}
