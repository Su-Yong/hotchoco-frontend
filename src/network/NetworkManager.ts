import { Manager } from "socket.io-client";

class NetworkManager {
  private url: string;

  private manager: Manager;

  constructor(url: string) {
    this.url = url;
    this.manager = new Manager(url);
  }
}

export default NetworkManager;
