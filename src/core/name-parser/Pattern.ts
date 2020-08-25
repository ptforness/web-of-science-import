class Pattern {
  public static initial = /^[A-Za-z]\.?$/;
  public static hyphenated = /^[A-Za-z]+-[A-Za-z]+$/;
  public static doubleLastName = /([A-Za-z]+-?[A-Za-z]+\s)([A-Za-z]+-?[A-Za-z]+\s?)+/;
  public static nick = /["(][A-Za-z]+[")]/;
  public static clean = /['"()]+/g;
}

export default Pattern;
