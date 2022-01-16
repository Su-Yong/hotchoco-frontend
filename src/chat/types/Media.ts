class Media {
  private file: File;
  private type: string;

  constructor(file: File) {
    this.file = file;
    this.type = this.file.type;
  }

  thumbnail() {
    // TODO
  }

  get mime() {
    return this.type;
  }
}

export default Media;
