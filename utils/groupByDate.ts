export function groupByDate ( data: any[] )
{

  const grouped: { [ key: string ]: any[] } = {};//Tạo biến grouped có kiểu là mảng gồm date[]: value[]

  // Nhóm dữ liệu theo ngày
  data.forEach( item =>
  {
    const dateKey = new Date( item.date ).toDateString();
    if ( !grouped[ dateKey ] )
    {
      grouped[ dateKey ] = []//Nếu mảng của date đó chưa có sẽ tạo mảng của dataKey
    };
    grouped[ dateKey ].push( item );//đẩy dữ liệu vào mảng của dataKey
  } );

  // Sắp xếp từ hiện tại đến quá khứ
  // kq < 0; ngày a sẽ là ngày mới 
  // kq > 0, ngày b sẽ là ngày mới
  const sortedDates = Object.keys( grouped ).sort( ( a, b ) => new Date( b ).getTime() - new Date( a ).getTime() );
  // Trả về kết quả đã nhóm và sắp xếp
  return sortedDates.map( date => ( {
    title: date,
    data: grouped[ date ],
  } ) );
}