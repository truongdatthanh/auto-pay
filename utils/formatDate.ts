export const formatDate = (dateInput: string | Date): string => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
};
  

export function groupByDate ( data: any[] )
  {
    const grouped: { [ key: string ]: any[] } = {};
    data.forEach( item =>
    {
      const dateKey = new Date( item.date ).toDateString();
      if ( !grouped[ dateKey ] ) grouped[ dateKey ] = [];
      grouped[ dateKey ].push( item );
    } );
    return Object.keys( grouped ).map( date => ( {
      title: date,
      data: grouped[ date ],
    } ) );
  }