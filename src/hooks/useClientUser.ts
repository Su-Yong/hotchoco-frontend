import User from '@/types/User';
import dummy from '@/utils/dummy';

// TODO: remove dummy data
const clientUser = dummy.users[(Math.random() * dummy.users.length) | 0];
const useClientUser = (): User => {
  return clientUser;
};

export default useClientUser;
