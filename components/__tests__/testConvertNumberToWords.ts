import { convertNumberToWords } from "../../features/speech/convertNumberToWords";

const testCases: { input: number; expected: string[] }[] = [
  // Các số nhỏ
  { input: 0, expected: [ "khong", "dong" ] },
  { input: 1, expected: [ "mot", "dong" ] },
  { input: 5, expected: [ "nam", "dong" ] },
  { input: 15, expected: [ "muoi", "lam", "dong" ] },
  { input: 105, expected: [ "mot", "tram", "linh", "nam", "dong" ] },

  // Trăm nghìn đơn giản
  { input: 123000, expected: [ "mot", "tram", "hai", "muoi", "ba", "nghin", "dong" ] },
  { input: 50000, expected: [ "nam", "muoi", "nghin", "dong" ] },
  { input: 101000, expected: [ "mot", "tram", "linh", "mot", "nghin", "dong" ] },
  { input: 100500, expected: [ "mot", "tram", "nghin", "nam", "tram", "dong" ] },

  // Triệu
  { input: 1000000, expected: [ "mot", "trieu", "dong" ] },
  { input: 1250000, expected: [ "mot", "trieu", "hai", "tram", "nam", "muoi", "nghin", "dong" ] },
  { input: 1005000, expected: [ "mot", "trieu", "khong", "tram", "linh", "nam", "nghin", "dong" ] },
  { input: 1001000, expected: [ "mot", "trieu","khong", "tram", "linh", "mot", "nghin", "dong" ] },

  // Tỷ (1 tỷ = 1.000.000.000)
  { input: 1000000000, expected: [ "mot", "ty", "dong" ] },
  { input: 1000005000, expected: [ "mot", "ty", "khong", "tram", "linh", "nam", "nghin", "dong" ] },
  {
    input: 1234567890,
    expected: [
      "mot", "ty",
      "hai", "tram", "ba", "muoi", "bon", "trieu",
      "nam", "tram", "sau", "muoi", "bay", "nghin",
      "tam", "tram", "chin", "muoi",
      "dong"
    ],
  },
];

describe( "convertNumberToWords()", () =>
{
  testCases.forEach( ( { input, expected } ) =>
  {
    test( `convert ${ input } to ${ expected.join( " " ) }`, () =>
    {
      expect( convertNumberToWords( input ) ).toEqual( expected );
    } );
  } );
} );
