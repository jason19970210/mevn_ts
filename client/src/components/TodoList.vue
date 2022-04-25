<template>
  <div class="outer-container">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h4>Todo List</h4>
    <div class="submit-form">
      <!-- <div v-if="!submitted"> -->
      <div>
        <div class="form-group">
          <label for="content">Content</label>
          <input type="text" class="form-control" id="content" required v-model="todo.content" name="content" placeholder="Input the todo !!" />
        </div>
        <br>
        <div class="form-group">
          <label for="priority">Priority</label>
          <!-- https://www.codegrepper.com/code-examples/html/input+type+number+dropdown -->
          <select class="form-control" id="priority" required v-model="todo.priority" name="priority">
            <option value="0" selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <br>
        <button class="btn btn-success" @click="addTodo">Add</button>
      </div>
      <!-- <div v-else>
                <button class="btn btn-success" @click="initTodo">Add</button>
            </div> -->

      <br>
      <label for="sortBy">Sort By</label>
      <select class="form-control" id="sortBy" v-model="sortBy" name="sortBy" @change="sortTodos()">
        <option value="0">Datetime</option>
        <option value="1">Priority</option>
      </select>
      <br>
      <label for="sortBy">Filter</label>
      <br>
      <div class="button">
        <button type="button" class="btn btn-primary" @click="filterType = 0">All</button>
        <span>&nbsp;</span>
        <button type="button" class="btn btn-primary" @click="filterType = 1">Done</button>
        <span>&nbsp;</span>
        <button type="button" class="btn btn-primary" @click="filterType = 2">Not Done Yet</button>
      </div>
    </div>
    <br>
    <table>
      <thead>
        <th>ID</th>
        <th>Content</th>
        <th>Priority</th>
        <th>Done</th>
        <th>Created</th>
        <th>Check</th>
        <th>Modify</th>
        <th>Delete</th>
      </thead>
      <tr :class="{ active: index == currentIndex }" v-for="(todo, index) in filteredTodos" :key="index">
        <td>{{ todo._id }}</td>
        <td>{{ todo.content }}</td>
        <td>{{ todo.priority }}</td>
        <td>{{ todo.done }}</td>
        <td>{{ todo.createdDatetime }}</td>
        <!-- https://fontawesome.com/v4/icon/check -->
        <td class="check" v-if="todo.done">
          <button class="check-btn" @click="checkTodo(todo)">
            <i class="fas fa-check" style='color: #40c587'></i>
          </button>
        </td>
        <td class="check" v-else>
          <button class="check-btn" @click="checkTodo(todo)">
            <i class="fas fa-check"></i>
          </button>
        </td>
        <td class="edit">
          <button class="edit-btn" @click="popupEditTodo(todo)">
            <i class="fas fa-edit"></i>
          </button>
        </td>
        <td class="delete">
          <button class="delete-btn" @click="deleteTodo(todo)">
            <i class="fas fa-trash-alt" title="delete row"></i>
          </button>
        </td>
      </tr>
    </table>
  </div>

  <!-- https://gitart-vue-dialog.gitart.org/guide/quick-start.html#minimal-working-example -->
  <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper">
      <div class="content">
        <div class="title">Content</div>

        <!-- <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Porro, ratione!
                </p> -->
        <label for="content">Content</label>
        <!-- <input type="text" class="form-control" id="edit_content" required v-model="currentTodo.content" name="edit_content" /> -->
        <input type="text" class="form-control" id="edit_content" v-model.lazy="currentTodo.content" required name="edit_content" />
        <label for="priority">Priority</label>
        <select class="form-control" id="priority" required v-model.lazy="currentTodo.priority" name="priority">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div class="actions">
        <button class="btn btn--outline-gray" @click="disablePopupTodo()">
          Cancel
        </button>
        <button class="btn btn--outline-gray" @click="updateTodo(currentTodo)">
          Submit
        </button>
      </div>
    </div>
  </GDialog>

</template>
<script lang="ts">

  import { computed, ref, defineComponent } from "vue";
  import TodoDataService from "@/services/TodoDataService";
  import Todo from "@/types/Todo";
  import ResponseData from "@/types/ResponseData";
  import { isReturnStatement, jsxClosingElement } from "@babel/types";
  import { TextUnderlineOffsetProperty } from "csstype";

  export default defineComponent({
    name: "todo-list",
    data: function () {
      const dialogState = ref(false); // for pop up
      const sortBy = 0;
      const filterType = 0;

      return {
        todos: [] as Todo[],
        currentTodo: {} as Todo,
        currentIndex: -1,
        content: "",
        todo: {
          content: "",
          priority: 0
        } as Todo,
        submitted: false,
        dialogState, // for pop up
        sortBy,
        filterType
      };
    },
    computed: {
      // https://codepen.io/akmur/pen/YQpgNL
      filteredTodos() {
        console.log(this.filterType)
        if (this.filterType === 1) {
          let filteredTodos = this.todos.filter((todo: Todo) => {
            return todo.done === true
          })
          return filteredTodos;
        } else if (this.filterType === 2) {
          let filteredTodos = this.todos.filter((todo: Todo) => {
            return todo.done == false
          })
          return filteredTodos;
        } else {
          let filteredTodos = this.todos
          return filteredTodos;
        }

      }
    },
    methods: {
      fetchTodos() {
        // console.log("fetchTodos");
        TodoDataService.getAllTodos()
          .then((res: ResponseData) => {
            let _todos = res.data.todos as Todo[]
            _todos.sort(
              (objA, objB) => new Date(objB.createdDatetime).valueOf() - new Date(objA.createdDatetime).valueOf()
            );
            this.todos = _todos;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      initTodo() {
        this.submitted = false;
        this.todo = { priority: 0 } as Todo;
      },
      sortTodos() {
        // console.log("sortTodos")
        // console.log(this.sortBy)
        if (this.sortBy) { // 1
          this.todos.sort(function (a: Todo, b: Todo) {
            return b.priority - a.priority
          })
        } else {
          this.todos.sort(function (a: Todo, b: Todo) {
            return new Date(b.createdDatetime).valueOf() - new Date(a.createdDatetime).valueOf()
          })
        }
      },
      addTodo() {
        if(this.todo.content.length === 0){
          alert("Input cannot be empty !")
          return
        }
        let data = {
          "content": this.todo.content,
          "priority": this.todo.priority
        };
        TodoDataService.createTodo(data)
          .then((res: ResponseData) => {
            // console.log(res.status)
            if (res.status === 201) {
              this.submitted = true;
              // this.todos.push(res.data.todo);
              this.fetchTodos()
              this.initTodo(); // init
              alert("submitted successfully");
            }
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      checkTodo(todo: Todo) {
        let data = {
          "done": !todo.done,
        };
        TodoDataService.updateTodo(todo._id, data)
          .then((res: ResponseData) => {
            // console.log(res)
            this.fetchTodos()
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      popupEditTodo(todo: Todo) {
        this.dialogState = true;
        // console.log(todo);
        this.currentTodo = todo;
      },
      disablePopupTodo() {
        this.dialogState = false;
        this.fetchTodos()
      },
      updateTodo(todo: Todo) {
        this.dialogState = false;
        let data = {
          "content": todo.content,
          "priority": todo.priority
        };
        TodoDataService.updateTodo(todo._id, data)
          .then((res: ResponseData) => {
            // console.log(res)
            this.fetchTodos()
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      deleteTodo(todo: Todo) {
        // console.log("deleteTodo")
        TodoDataService.deleteTodo(todo._id)
          .then((res: ResponseData) => {
            // console.log(res)
            if (res.status === 200) {
              alert("delete successfully");
              this.fetchTodos()
            }
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    },
    mounted() {
      // console.log("mounted");
      this.fetchTodos();
    }
  });
</script>

<style>
  /* START CSS VARIABLES */
  :root {
    /* --body-background: #1c223b; */
    --body-text: #ffffff;
    /* --container-background: #273349; */
    /* --table-background: #1c223b; */
    /* --table-background-hover: #151b31; */
    /* --table-text: #e2e2e2; */
    --table-text: #2c3e50;
    /* --priority-200: #d6a13f; */
    --priority-300: #4480e7;
    /* --priority-600: #40c587; */
    /* --delete-background: #242c4c; */
    --check-hover: #40c587;
    --edit-hover: #406fc5;
    --delete-color: #909090;
    --delete-hover: #ff0000;
  }

  /* END CSS VARIABLES */
  h4 label {
    color: var(--body-text);
  }

  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }

  /* START OUTER CONTAINER STYLES */
  .outer-container {
    background-color: var(--container-background);
    border-radius: 0.625rem;
    box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
    padding: 6.25rem;
    margin: auto;
    width: 90%;
    max-width: 62.5rem;
  }

  /* Start Table Styles */
  table {
    color: var(--table-text);
    font-size: 0.875rem;
    padding: 0.625rem;
    width: 100%;
    table-layout: fixed;
  }

  table th {
    font-size: 1rem;
  }

  table th,
  table td {
    padding: 0.9375rem;
    text-align: left;
    word-wrap: break-word;
  }

  table tbody tr {
    background-color: var(--table-background);
  }

  table tbody tr:hover {
    background-color: var(--table-background-hover);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }

  table tbody tr td:first-of-type {
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
  }

  table tbody tr td:last-of-type {
    border-top-right-radius: 0.3125rem;
    border-bottom-right-radius: 0.3125rem;
    text-align: center;
  }

  table tbody tr.priority-200 td:first-of-type {
    border-left: 0.3125rem solid var(--priority-200);
  }

  table tbody tr.priority-300 td:first-of-type {
    border-left: 0.3125rem solid var(--priority-300);
  }

  table tbody tr.priority-600 td:first-of-type {
    border-left: 0.3125rem solid var(--priority-600);
  }

  table tbody tr td .fa-circle {
    transform: scale(0.7);
  }

  table tbody tr.priority-200 td .fa-circle {
    color: var(--priority-200);
  }

  table tbody tr.priority-300 td .fa-circle {
    color: var(--priority-300);
  }

  table tbody tr.priority-600 td .fa-circle {
    color: var(--priority-600);
  }

  .delete-btn {
    cursor: pointer;
    /* background-color: var(--delete-background); */
    /* background-color: transparent; */
    border: 0;
    border-radius: 0.125rem;
    color: var(--delete-color);
    font-size: 1.1rem;
    /* opacity: 0.2; */
    padding: 0.3125rem 0.625rem;
  }

  .delete-btn:hover {
    color: var(--delete-hover);
  }

  /* .delete-btn:focus {
  outline: 0;
}*/
  .edit-btn {
    cursor: pointer;
    /* background-color: var(--delete-background); */
    /* background-color: transparent; */
    border: 0;
    border-radius: 0.125rem;
    color: var(--delete-color);
    font-size: 1.1rem;
    /* opacity: 0.2; */
    padding: 0.3125rem 0.625rem;
  }

  .edit-btn:hover {
    color: var(--edit-hover);
  }

  .check-btn {
    cursor: pointer;
    /* background-color: var(--delete-background); */
    /* background-color: transparent; */
    border: 0;
    border-radius: 0.125rem;
    color: var(--delete-color);
    font-size: 1.1rem;
    /* opacity: 0.2; */
    padding: 0.3125rem 0.625rem;
  }

  .check-btn:hover {
    color: var(--check-hover);
  }

  /* table tbody tr:hover .delete-btn {
  opacity: 1;
} */
  /* End Table Styles */
  /* END OUTER CONTAINER STYLES */
  /* For pop up */
  .wrapper {
    color: #000;
  }

  .content {
    padding: 20px;
  }

  .title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
</style>