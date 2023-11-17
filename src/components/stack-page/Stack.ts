interface IStack<T> {
  push: (item: T) => void
  pop: () => void
  clear: () => void
}

export class Stack<T> implements IStack<T> {
  private container: T[] = []

  push = (item: T) => {
    this.container.push(item)
  }

  pop = () => {
    if (this.container.length > 0) {
      this.container.pop()
    }
  }

  clear = () => {
    this.container = []
  }

  get size() {
    return this.container.length
  }

  get stack(): T[] {
    return this.container;
  }
}