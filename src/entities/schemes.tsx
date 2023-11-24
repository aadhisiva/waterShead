import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Schemes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ""})
  SchemeName: string;

  @Column({ default: ""})
  SchemeCode: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
