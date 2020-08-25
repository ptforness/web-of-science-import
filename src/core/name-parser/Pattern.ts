class Pattern {
    public static initial: RegExp = /^[A-Za-z]\.?$/;
    public static hyphenated: RegExp = /^[A-Za-z]+\-[A-Za-z]+$/;
    public static doubleLastName: RegExp = /([A-Za-z]+\-?[A-Za-z]+\s)([A-Za-z]+\-?[A-Za-z]+\s?)+/;
    public static nick: RegExp = /["\(][A-Za-z]+["\)]/;
    public static clean: RegExp = /['"\(\)]+/g;
}

export default Pattern;