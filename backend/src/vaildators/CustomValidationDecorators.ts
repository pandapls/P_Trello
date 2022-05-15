import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

export function IsSameValue(property : string, validationOptions?:ValidationOptions ) {
    return function (
        target : Object,
        propertyName : string
    ) {
        registerDecorator({
            name : 'isSameValue',
            target: target.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {

                    // 第一个参数指定的属性对应的值
                    const relateValue = validationArguments && (validationArguments.object as any)[property];

                    // value 当钱装饰器属性的指
                    return relateValue === value;
                }
            }
        })
    }
}