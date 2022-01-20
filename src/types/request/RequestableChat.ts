import Room from '../Room';
import User from '../User';

interface RequestableChat<ContentType> {
  sender: User;
  room: Room;
  content: ContentType;
}

export default RequestableChat;
