export class DateFormat {
  public static GMT(hour: number) {
    return new Date(
      new Date().setHours(new Date().getHours() + hour)
    ).toISOString();
  }
}
