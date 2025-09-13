class Person {
  private name: string

  public constructor(name: string) {
    this.name = name
  }

  //this is method for getting name
  public getName(): string {
    return this.name
  }
}

const person = new Person('Jane')
console.log(person.getName())
