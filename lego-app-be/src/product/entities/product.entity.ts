import { BaseEntity } from '../../commons/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BooleanEnum,
  StatusEnum,
} from '../../commons/constants/global.constant';
import { ProductsToCategoriesEntity } from './products-to-categories.entity';
import { ThemeEntity } from './../../theme/entities/theme.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @PrimaryColumn()
  key: string;

  @Column()
  slug: string;

  @Column({ unique: true })
  //custom multilanguages 1-n
  name: string;

  @Column({
    nullable: true,
  })
  image: string; //todo: lấy file (Chưa làm)

  @Column({
    nullable: true,
  })
  price: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ enum: BooleanEnum, default: BooleanEnum.TRUE })
  enabled: BooleanEnum;

  @Column({ enum: StatusEnum, default: StatusEnum.AVAILABLE })
  status: StatusEnum;

  //todo: Themes 1-n:
  @Column({ name: 'theme_key', nullable: true })
  themeKey: string;

  @ManyToOne(() => ThemeEntity, (theme) => theme.products)
  @JoinColumn({ name: 'theme_key', referencedColumnName: 'key' }) //@JoinColumn nên cho vào @ManyToOne
  theme: ThemeEntity;

  //todo: Categories n-n
  @OneToMany(
    () => ProductsToCategoriesEntity,
    (productsToCategories) => productsToCategories.product,
    {
      cascade: ['insert'], //cascade nên cho vào @OneToMany
    },
  )
  productsToCategories: ProductsToCategoriesEntity[];
}
