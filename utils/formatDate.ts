export const formatDate = (dateInput: string | Date): string => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };