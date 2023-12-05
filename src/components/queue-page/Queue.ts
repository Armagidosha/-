interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      return
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty) {
      return
    }

    this.container[this.head % this.size] = null;
    this.head++
    this.length--;
  };

  clear = () => {
    this.length = 0
    this.tail = 0
    this.head = 0
    this.container = Array(this.size)
  }

  get isEmpty() {
    return this.length === 0;
  }

  get queue(): (T | null)[] {
    return this.container
  }

  get arrSize() {
    return this.size
  }

  get end() {
    return this.tail
  }

  get start() {
    return this.head
  }
}