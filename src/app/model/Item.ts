export class Item {
  constructor(public title: string, public url: string, public time: number, public id: number, public by: string, public kids: Array<number>, public descendant: number, public score: number, public type: string) {}
}