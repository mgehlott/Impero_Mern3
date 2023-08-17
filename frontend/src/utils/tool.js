import { toast } from 'react-toastify';
export const showToast = (type, message) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(message, {
        position: 'top-right',
      });
      break;
    case 'ERROR':
      toast.error(message, { position: 'top-right' });
      break;
    default:
      return false;
  }
};
