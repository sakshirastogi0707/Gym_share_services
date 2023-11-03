import { ValueTransformer } from 'typeorm';

export class EnumTransformer implements ValueTransformer {
  private genEnum;
  constructor(genericEnum) {
    this.genEnum = genericEnum;
  }
  to(value: string): number {
    return this.genEnum[value];
  }

  from(value: number): string {
    return this.genEnum[value];
  }
}
