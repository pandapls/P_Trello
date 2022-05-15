import {
    Model, 
    PrimaryKey, 
    Table,
    AutoIncrement,
    Column,
    AllowNull,
    Unique,
    DataType,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
const crypto = require('crypto');


@Table({
    tableName: 'User'
})
export class User extends Model<User>{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(50)
    })
    name : string;
    
    @Column
    set password(val : string) {
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(val).digest('hex');
        this.setDataValue('password',  newPassword)
    };

    @CreatedAt
    createdAt : Date;

    @UpdatedAt
    updatedAt : Date;
}