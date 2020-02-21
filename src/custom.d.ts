type User = {
  account: string
}

type Tomato = {
  id: number
}

type Todo = {
  id: number
  editing?: boolean
}

type TomatoResponse = {
  resources: Tomato[]
}

type TodoResponse = {
  resources: Todo[]
}