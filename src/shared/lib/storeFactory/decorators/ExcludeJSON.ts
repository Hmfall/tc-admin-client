import { Exclude } from 'class-transformer';

export const ExcludeJSON = () => {
  return (target: any, propertyKey: string) => {
    Exclude({ toPlainOnly: true })(target, propertyKey);
  };
};
