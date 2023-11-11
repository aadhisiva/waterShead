import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  CategoryName: string;

  @Column({ default: '' })
  SectorCode: string;

  @Column({ default: "" })
  IsActivity: string;

  @Column({ default: "" })
  IsSubActivity: string;

  @Column({ default: "" })
  ActivityCode: string;

  @Column({ default: "" })
  CategoryCode: string;

  @Column({ default: "" })
  SubActivityCode: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

};
