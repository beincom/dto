import { UUID, ValueObjectProperties } from '@beincom/domain';

export class UserId extends UUID {
  constructor(props: ValueObjectProperties<string>) {
    super(props);
  }

  public static fromString(value: string) {
    return new UserId({ value });
  }
}
