export interface LinkedList<T> {
  append: (element: T) => Node<T>
  prepend: (element: T) => Node<T>
  insertAt: (element: T, position: number) => Node<T> | undefined
  removeAt: (index: number) => void
  getSize: () => number

}

export class Node<T> {
  value: T
  prev: Node<T> | null
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null, prev?: Node<T> | null) {
    this.value = value;
    this.prev = (prev === undefined ? null : prev)
    this.next = (next === undefined ? null : next)
  }
}

export class LinkedList<T> implements LinkedList<T> {
  private tail: Node<T> | null
  private head: Node<T> | null;
  private size: number;
  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0
    for (const element of elements) {
      this.prepend(element)
    }
  }

  append = (element: T) => {
    const node = new Node(element)

    if (!this.head) {
      this.head = node
    }

    if (!this.tail) {
      this.tail = node
    }

    this.tail.next = node
    this.tail = node

    this.size++
    return node
  }

  prepend = (element: T) => {
    const node = new Node(element)
    if (!this.tail) {
      this.tail = node
    }
    node.next = this.head
    this.head = node
    this.size++
    return node
  }

  detachHead = () => {
    const oldHead = this.head
    if (!this.head) {
      return
    }
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    this.size--
    return oldHead
  }

  detachTail = () => {
    const oldTail = this.tail
    if (!this.head) {
      return;
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }
    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
    this.tail = current;
    this.size--;
    return oldTail
  }


  insertAt = (element: T, index: number) => {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index - 1 && curr) {
          curr = curr.next;
          currIndex++;
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
      return node
    }
  }

  removeAt = (index: number) => {
    if (index < 0 || index >= this.size) {
      return
    } else {
      if (index === 0) {
        this.detachHead();
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;
        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
        if (curr && prev) {
          prev.next = curr.next;
          if (!curr.next) {
            this.tail = prev;
          }
          this.size--;
        }
      }
    }
  }

  returnList = () => {
    let current = this.head
    let list = []
    while (current) {
      list.push(current.value)
      current = current.next
    }
    return list
  }

  get listSize() {
    return this.size
  }

  get listHead() {
    return this.head
  }

  get listTail() {
    return this.tail
  }
}