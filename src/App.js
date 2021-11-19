import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodo } from './actions/todos'

class App extends Component {

  state = {
    todo: ''
  }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    });
  }

  // dispatch comes from the connect() function
  handleOnSubmit = event => {
    event.preventDefault();
    console.log("Todo being added: ", this.state.todo);

    // this.props.dispatch({ type: 'ADD_TODO', todo: this.state.todo });

    // to dry our code we create a Action Creator instead of pass the action directly
    // this.props.dispatch(this.addTodo())

    // after created a separate folder to hold the Action Creators (separation of concerns)
    // this.props.dispatch(addTodo(this.state.todo))

    // with mapDispatchToProps integrated dispatch into this.props.addTodo, we execute the Action Creator by referecing it as a prop
    // the Action Creator it NOT the action creator itself
    // the Action Creator is being dispatched INSIDE the function called with this.props.addTodo()
    this.props.addTodo(this.state.todo) // no longer calling dispatch here
    this.setState({ todo: '' });
  }

  // Action Creator
  // It returns a action object witg a type of 'ADD_TODO' and a todo payload taken from our local state
  // A common pattern, is to create a separate folder to hold our action creators (see ./src/action/todo.js)
  // addTodo = () => {
  //   return ({
  //     type: 'ADD_TODO',
  //     todo: this.state.todo
  //   })
  // }

  render() {
    // debugger
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    return (
      <div className="App">
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.handleOnChange(event)}
            id="todos"
            placeholder="add todo"
            value={this.state.todo} />
          <input type="submit" />
        </form>
        <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

// add a props addTodo that also points to a value, in this case a function
// the dispatch function is available as an argument to mapDispatchToProps
// definiting the function addTodo inside here, we're able to include dispatch in the definition
// we bundle everything we need into a single prop value
const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => {
      dispatch(addTodo(todo))
    }
  }
}

// mapDispatchToProps takes in dispatch as an argument
// It then returns an object that contains a function as a value
export default connect(mapStateToProps, mapDispatchToProps)(App);
// when connect() executes, it calls both functions (mapStateToProps, maoDispatchToProps)
// it pass state in to the 1st
// and dispatch function to the 2nd 

// Alternative Method, for mapDispatchToProps, simpler:
// The 2nd argument of connect() accepts a function (mapDispatchToProps) or an object
// If we pass a function (mapDispatchToProps), we must incorporate dispatch amd explicity handle the todo argument (as mapDispatchToProps function, line 79 - 85)
// If we pass in a object, connect handles both of these steps of us
// The object needs to contain key/value pairs for each Action Creator we want to become props
// export default connect(mapStateToProps, { addTodo })(App) -> this way, we don't neet the mapDispatchToProps method, line 79 - 85

// Alternative Method, for mapStateToProps, simpler:
// It still needs to pass in a function as the 1st argument, but it can be an anonymous arrow function that handles everything in one line
// export default connect(state => ({ todos: state.todo }), { addTodo })(App) -> this way, we don't need the mapStateToProps method, line 69 - 73
