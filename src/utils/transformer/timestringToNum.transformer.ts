import { ValueTransformer } from 'typeorm';

export class TimeStringNumTransformer implements ValueTransformer {
  to(value: string): number {
    return parseInt(value.split(':').join(''));
  }

  from(value: number): string {
    const time = value.toString().split('');
    time.splice(2, 0, ':').join('');
    return time.splice(2, 0, ':').join('');
  }
}
