// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Todo from './Todo.js';
import style from './style.css';

class App extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.filter = this.filter.bind(this);
		this.state = {
			term: '',
			todos: [],
			filter: ''
		};
	}

	onChange (event) {
		this.setState({term: event.target.value});
	}

	onSubmit () {
		this.props.addTodo(this.state.term);
	}

	onToggleTodo = (index) => {
		this.props.toggleTodo(index)
	}

	filter(event) {
		if( event.target.value === 'complete') {
			this.setState({ filter: true});
		}
		if(event.target.value === 'todo') {
			this.setState({ filter: false});
		}
		if(event.target.value === 'all') {
			this.setState({ filter: ''});
		}
	}

	componentWillMount() {
		this.props.loadTodos();
	}

	render() {
		let todos = this.props.todos;

		return (
			<div>
				<label>
					Name: <input type="text" value={this.state.term} onChange={this.onChange} />
				</label>
				<button value="Submit" onClick={this.onSubmit}>Add</button>
				<ul>
					{todos.length ?
						(
							todos.map(
								(todo, index) => {
									if (this.state.filter === true && !todo.complete) {
										return null;
									}
									if (this.state.filter === false && todo.complete) {
										return null;
									}
									return <Todo key={index} index={index} todo={todo} onToggleTodo={this.onToggleTodo} />
								}
							)
						) : (
							<p>No todo</p>
						)
					}
				</ul>
				<div>
					Filter:  
					<input type="radio" name="filter" value="all" onChange={this.filter} /> All
					<input type="radio" name="filter" value="complete" onChange={this.filter} /> Completed
					<input type="radio" name="filter" value="todo" onChange={this.filter} /> To do
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadTodos: () => {
			dispatch({ type: "LOAD_TODOS"});
		},
		toggleTodo: index => {
			dispatch({ type: "TOGGLE_TODO", index });
		},
		addTodo: label => {
			dispatch({ type: "ADD_TODO", label });
		}
	};
}

function mapStateToProps(state) {
	return {
		todos: state.todos
	};
}

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default TodosContainer; 
