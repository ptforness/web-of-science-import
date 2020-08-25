import { Name } from '../name';
import NameParser from '../nameParser';

test('Format(s): (FI | FI.) (MI | MI.) Last', () => {
  let out: Name = NameParser.parseName('F M Last');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('F M. Last');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    last: 'Last',
  });

  out = NameParser.parseName('F. M Last');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('F. M. Last');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    last: 'Last',
  });
});

test('Format(s): (FI | FI.)', () => {
  let out: Name = NameParser.parseName('F');
  expect(out).toMatchObject({
    first: 'F',
  });

  out = NameParser.parseName('F.');
  expect(out).toMatchObject({
    first: 'F.',
  });
});

test('Format(s): (FI | FI.) (MI | MI.)', () => {
  let out: Name = NameParser.parseName('F M');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
  });

  out = NameParser.parseName('F M.');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
  });

  out = NameParser.parseName('F. M');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
  });

  out = NameParser.parseName('F. M.');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
  });
});

test('Format(s): (FI | FI.) (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('F M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    suffix: 'Suffix',
  });
});

test('Format(s): (FI | FI.) (MI | MI.) ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('F M "Nick"');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F M. "Nick"');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F. M "Nick"');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F. M. "Nick"');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F M (Nick)');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F M. (Nick)');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F. M (Nick)');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F. M. (Nick)');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
  });
});

test('Format(s): (FI | FI.) (MI | MI.) ("Nick" | (Nick), Suffix', () => {
  let out: Name = NameParser.parseName('F M "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F M. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F M (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F M. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. M. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });
});

test('Format(s): (FI | FI.) ("Nick" | (Nick)) (MI | MI.)', () => {
  let out: Name = NameParser.parseName('F "Nick" M');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F "Nick" M.');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F. "Nick" M');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F. "Nick" M.');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F (Nick) M');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F (Nick) M.');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
  });

  out = NameParser.parseName('F. (Nick) M');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
  });

  out = NameParser.parseName('F. (Nick) M.');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
  });
});

test('Format(s): (FI | FI.) ("Nick" | (Nick) (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('F "Nick" M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F "Nick" M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. "Nick" M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. "Nick" M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F (Nick) M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F (Nick) M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. (Nick) M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. (Nick) M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });
});

test('Format(s): (FI | FI.) First', () => {
  let out: Name = NameParser.parseName('F First');
  expect(out).toMatchObject({
    first: 'F First',
  });

  out = NameParser.parseName('F. First');
  expect(out).toMatchObject({
    first: 'F. First',
  });
});

test('Format(s): (FI | FI.) First, Suffix', () => {
  let out: Name = NameParser.parseName('F First, Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. First, Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    suffix: 'Suffix',
  });
});

test('Format(s): (FI | FI.) First ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('F First "Nick"');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
  });

  out = NameParser.parseName('F. First "Nick"');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
  });

  out = NameParser.parseName('F First (Nick)');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
  });

  out = NameParser.parseName('F. First (Nick)');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
  });
});

test('Format(s): (FI | FI.) First ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('F First "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. First "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F First (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('F. First (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    suffix: 'Suffix',
  });
});

test('Format(s): First', () => {
  const out: Name = NameParser.parseName('First');
  expect(out).toMatchObject({
    first: 'First',
  });
});

test('Format(s): First (MI | MI.)', () => {
  let out: Name = NameParser.parseName('First M');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
  });

  out = NameParser.parseName('First M.');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
  });
});

test('Format(s): First (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('First M, Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First M., Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    suffix: 'Suffix',
  });
});

test('Format(s): First (MI | MI.) ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('First M "Nick"');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
  });

  out = NameParser.parseName('First M. "Nick"');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
  });

  out = NameParser.parseName('First M (Nick)');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
  });

  out = NameParser.parseName('First M. (Nick)');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
  });
});

test('Format(s): First ("Nick" | (Nick)) (MI | MI.)', () => {
  let out: Name = NameParser.parseName('First "Nick" M');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
  });

  out = NameParser.parseName('First "Nick" M.');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
  });

  out = NameParser.parseName('First (Nick) M');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
  });

  out = NameParser.parseName('First (Nick) M.');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
  });
});

test('Format(s): First (MI | MI.) ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('First M "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First M. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First M (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M',
    nick: 'Nick',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First M. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'First',
    middle: 'M.',
    nick: 'Nick',
    suffix: 'Suffix',
  });
});

test('Format(s): First ("Nick" | (Nick)) (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('First "Nick" M, Suffix');
  expect(out).toMatchObject({
    first: 'First',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First "Nick" M., Suffix');
  expect(out).toMatchObject({
    first: 'First',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First (Nick) M, Suffix');
  expect(out).toMatchObject({
    first: 'First',
    nick: 'Nick',
    middle: 'M',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('First (Nick) M., Suffix');
  expect(out).toMatchObject({
    first: 'First',
    nick: 'Nick',
    middle: 'M.',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, First', () => {
  const out: Name = NameParser.parseName('Last, First');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
  });
});

test('Formats(s): Last, First, Suffix', () => {
  const out: Name = NameParser.parseName('Last, First, Suffix');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, First ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('Last, First "Nick"');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
    nick: 'Nick',
  });

  out = NameParser.parseName('Last, First (Nick)');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
    nick: 'Nick',
  });
});

test('Format(s): Last, First ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('Last, First "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
    suffix: 'Suffix',
    nick: 'Nick',
  });

  out = NameParser.parseName('Last, First (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'First',
    last: 'Last',
    suffix: 'Suffix',
    nick: 'Nick',
  });
});

test('Format(s): Last, (FI | FI.)', () => {
  let out: Name = NameParser.parseName('Last, F');
  expect(out).toMatchObject({
    first: 'F',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F.');
  expect(out).toMatchObject({
    first: 'F.',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('Last, F "Nick"');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. "Nick"');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F (Nick)');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. (Nick)');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) (MI | MI.)', () => {
  let out: Name = NameParser.parseName('Last, F M');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F M.');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M.');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('Last, F M "Nick"');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M "Nick"');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F M. "Nick"');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M. "Nick"');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F M (Nick)');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M (Nick)');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F M. (Nick)');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. M. (Nick)');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) (MI | MI.) ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F M "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F M. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M. "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F M (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F M. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. M. (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    middle: 'M.',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick)) (MI | MI.)', () => {
  let out: Name = NameParser.parseName('Last, F "Nick" M');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. "Nick" M');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F "Nick" M.');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. "Nick" M.');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F (Nick) M');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. (Nick) M');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F (Nick) M.');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. (Nick) M.');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick)) (MI | MI.), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F "Nick" M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. "Nick" M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F "Nick" M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. "Nick" M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F (Nick) M, Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. (Nick) M, Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F (Nick) M., Suffix');
  expect(out).toMatchObject({
    first: 'F',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. (Nick) M., Suffix');
  expect(out).toMatchObject({
    first: 'F.',
    nick: 'Nick',
    middle: 'M.',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) First', () => {
  let out: Name = NameParser.parseName('Last, F First');
  expect(out).toMatchObject({
    first: 'F First',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. First');
  expect(out).toMatchObject({
    first: 'F. First',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) First, Suffix', () => {
  let out: Name = NameParser.parseName('Last, F First, Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. First, Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) First ("Nick" | (Nick))', () => {
  let out: Name = NameParser.parseName('Last, F First "Nick"');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. First "Nick"');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F First (Nick)');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. First (Nick)');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) First ("Nick" | (Nick)), Suffix', () => {
  let out: Name = NameParser.parseName('Last, F First "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. First "Nick", Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F First (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. First (Nick), Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick)) First', () => {
  let out: Name = NameParser.parseName('Last, F "Nick" First');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. "Nick" First');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F (Nick) First');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
  });

  out = NameParser.parseName('Last, F. (Nick) First');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
  });
});

test('Format(s): Last, (FI | FI.) ("Nick" | (Nick)) First, Suffix', () => {
  let out: Name = NameParser.parseName('Last, F "Nick" First, Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. "Nick" First, Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F (Nick) First, Suffix');
  expect(out).toMatchObject({
    first: 'F First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });

  out = NameParser.parseName('Last, F. (Nick) First, Suffix');
  expect(out).toMatchObject({
    first: 'F. First',
    nick: 'Nick',
    last: 'Last',
    suffix: 'Suffix',
  });
});
