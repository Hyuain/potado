type User = {
  account: string
}

type Tomato = {
  id: number
}

type TomatoResponse = {
  resources: Tomato[]
}

type Todo = {
  id: number
  description: string
  completed: boolean
  editing?: boolean
}

type TodoGetResponse = {
  resources: Todo[]
}

type TodoUpdateResponse = {
  resource: Todo
}

type TodoUpdateParams = {
  description?: string
  completed?: boolean
  completed_at?: Date
  deleted?: boolean
}