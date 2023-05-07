export class User {
  public id: string | null
  public email: string
  public password: string

  constructor(id: string | null, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }
}