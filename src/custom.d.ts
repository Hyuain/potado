type User = {
  account: string
}

type Tomato = {
  id: number
  description: string
  started_at: string
  duration: number
  ended_at: string
  aborted: boolean
}

type TomatoesGroup = {
  [key: string]: Tomato[]
}

type TomatoGetResponse = {
  resources: Tomato[]
}

type TomatoUpdateResponse = {
  resource: Tomato
}

type TomatoUpdateParams = {
  aborted?: boolean
  description?: string
  ended_at?: string
  manually_created?: boolean
}


type Todo = {
  id: number
  description: string
  completed: boolean
  completed_at: string
  created_at: string
  editing?: boolean
  deleted: boolean
}

type TodosGroup = {
  [key: string]: Todo[]
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
  completed_at?: string
  deleted?: boolean
}