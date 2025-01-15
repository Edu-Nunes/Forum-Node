import { UniqueId } from './unique-id'

export class Entity<props> {
  private _id: UniqueId
  protected props: props

  get id() {
    return this._id
  }

  protected constructor(props: props, id?: UniqueId) {
    this.props = props
    this._id = id ?? new UniqueId()
  }
}
