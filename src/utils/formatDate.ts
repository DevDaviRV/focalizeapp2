const formatDate = (date: string | number | Date) => {
  const today = new Date();
  const taskDate = new Date(date);

  if (taskDate.toDateString() === today.toDateString()) {
    return 'Hoje';
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (taskDate.toDateString() === tomorrow.toDateString()) {
    return 'Amanhã';
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (taskDate.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  }

  // Se não for hoje, amanhã ou ontem, retorna a data completa formatada
  const day = taskDate.getDate().toString().padStart(2, '0');
  const month = (taskDate.getMonth() + 1).toString().padStart(2, '0');
  const year = taskDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export { formatDate };
