import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Activity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  ActivityName: string;

  @Column({ default: '' })
  CategoryCode: string;

  @Column({ default: '' })
  SectorCode: string;

  @Column({ default: '' })
  SubSchemeCode: string;

  @Column({ default: "" })
  IsSubActivity: string;

  @Column({ default: "" })
  ActivityCode: string;

  @Column({ default: "" })
  SubActivityCode: string;

  @Column({ default: "" })
  FormateType: string;

  @Column({ default: "", type: 'text' })
  TypeOfPerson: string;

  @Column({ default: "", type: 'text' })
  TypeOfWork: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
};
