import { Name } from '../name';
import NameParser from '../nameParser';

test('Format(s): Last Last-Last, First', () => {
    const out: Name = NameParser.parseName('Last Last-Last, First');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last'
    });
});

test('Formats(s): Last Last-Last, First, Suffix', () => {
    const out: Name = NameParser.parseName('Last Last-Last, First, Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, First "Nick"');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last Last-Last, First (Nick)');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last',
        nick: 'Nick'
    });
});

test('Format(s): Last Last-Last, First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last Last-Last, First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last Last-Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });
});

test('Format(s): Last Last-Last, (FI | FI.)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F.');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F M');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F M.');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M.');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F M "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F M. "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F M (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F M. (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. M. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick" M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F "Nick" M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) First', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F First');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. First');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F First "Nick"');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. First "Nick"');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F First (Nick)');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. First (Nick)');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick) First', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick" First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last'
    });
});

test('Format(s): Last Last-Last, (FI | FI.) ("Nick" | (Nick) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last Last-Last, F "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last Last-Last, F. (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, First', () => {
    const out: Name = NameParser.parseName('Last-Last Last, First');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last'
    });
});

test('Formats(s): Last-Last Last, First, Suffix', () => {
    const out: Name = NameParser.parseName('Last-Last Last, First, Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, First "Nick"');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last-Last Last, First (Nick)');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last',
        nick: 'Nick'
    });
});

test('Format(s): Last-Last Last, First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last-Last Last, First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });
});

test('Format(s): Last-Last Last, (FI | FI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F.');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F M');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F M.');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M.');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F M "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F M. "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F M (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F M. (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. M. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick" M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F "Nick" M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) First', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F First');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. First');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F First "Nick"');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. First "Nick"');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F First (Nick)');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. First (Nick)');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick) First', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick" First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last'
    });
});

test('Format(s): Last-Last Last, (FI | FI.) ("Nick" | (Nick) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last, F "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last, F. (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, First', () => {
    const out: Name = NameParser.parseName('Last-Last Last-Last, First');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last'
    });
});

test('Formats(s): Last-Last Last-Last, First, Suffix', () => {
    const out: Name = NameParser.parseName('Last-Last Last-Last, First, Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, First "Nick"');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last-Last Last-Last, First (Nick)');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last',
        nick: 'Nick'
    });
});

test('Format(s): Last-Last Last-Last, First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });

    out = NameParser.parseName('Last-Last Last-Last, First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'First',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix',
        nick: 'Nick'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F.');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F M');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M.');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M.');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F M "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M. "Nick"');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M. "Nick"');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M. (Nick)');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M. (Nick)');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M. "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. M. (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        middle: 'M.',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick" M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F "Nick" M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) M');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) M');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) M.');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) M.');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick) (MI | MI.), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) M, Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) M., Suffix');
    expect(out).toMatchObject({
        first: 'F.',
        nick: 'Nick',
        middle: 'M.',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) First', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F First');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) First ("Nick" | (Nick)', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F First "Nick"');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First "Nick"');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F First (Nick)');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First (Nick)');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) First ("Nick" | (Nick), Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First "Nick", Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. First (Nick), Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick) First', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick" First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) First');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) First');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last'
    });
});

test('Format(s): Last-Last Last-Last, (FI | FI.) ("Nick" | (Nick) First, Suffix', () => {
    let out: Name = NameParser.parseName('Last-Last Last-Last, F "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. "Nick" First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });

    out = NameParser.parseName('Last-Last Last-Last, F. (Nick) First, Suffix');
    expect(out).toMatchObject({
        first: 'F. First',
        nick: 'Nick',
        last: 'Last-Last Last-Last',
        suffix: 'Suffix'
    });
});