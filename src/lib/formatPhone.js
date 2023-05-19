export const formatPhone = (phone) => {
  if (phone) {
    // eslint-disable-next-line react/prop-types
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "+7 $1-$2-$3");
  }

  return;
};
