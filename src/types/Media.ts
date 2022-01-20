class Media<MimeType extends `${string}/${string}`> {
  private file: File;
  private type: MimeType;

  constructor(file: File) {
    this.file = file;
    this.type = this.file.type as MimeType;
  }

  thumbnail() {
    // TODO
  }

  get mime(): MimeType {
    return this.type;
  }
}

export default Media;
