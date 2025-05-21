import { decodeEMVCo } from '../../utils/decodeEMVCode.ts';

describe('decodeEMVCo function', () => {
  const sampleInput = '00020101021138520010A000000727012201083857253700069704160208QRIBFTTA620053037045802VN6304C58B';

  test('decodeEMVCo returns consistent results over 50 iterations', () => {
    const results = [];

    const firstResult = decodeEMVCo(sampleInput);
    results.push(firstResult);

    for (let i = 1; i < 50; i++) {
      const current = decodeEMVCo(sampleInput);
      results.push(current);
      expect(current).toEqual(firstResult);
    }

    console.log('✅ All 50 outputs are identical.');
    console.log('📌 Sample result:');
    console.log(firstResult); // in ra toàn bộ object kết quả
    console.log('📊 All results:');
    console.log(results); // in ra danh sách 50 kết quả
    console.log('🔢 Total results:', results.length);
  });
});


// import { decodeEMVCo } from '../../utils/decodeEMVCode.ts';

// describe('decodeEMVCo function', () => {
//     const sampleInput = '00020101021138520010A000000727012201083857253700069704160208QRIBFTTA620053037045802VN6304C58B';

//     test('decodeEMVCo returns consistent results over 50 runs', () => {
//         const firstResult = decodeEMVCo(sampleInput);

//         for (let i = 1; i <= 50; i++) {
//             const current = decodeEMVCo(sampleInput);
//             expect(current).toEqual(firstResult);
//         }

//         console.log('✅ All 50 outputs are identical and correct.');
//         console.log('Sample result:', firstResult);
//     });

//     test('❌ decodeEMVCo returns a wrong expected value (intentional fail)', () => {
//         const result = decodeEMVCo(sampleInput);

//         // Cố tình đưa sai dữ liệu mong đợi
//         const fakeExpected = { fakeKey: 'fakeValue' };

//         expect(result).toEqual(fakeExpected); // Fail ở đây
//     });
// });
