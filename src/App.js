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
		this.changeFilter = this.changeFilter.bind(this);
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

	changeFilter(event) {
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
		if (this.state.filter !== '') {
			todos = todos.filter((item) => item.complete == this.state.filter );
		}
		console.log(todos);
		return (
			<div>
				<label>
				Nom:
					<input type="text" value={this.state.term} onChange={this.onChange} />
				</label>
				<button value="Submit" onClick={this.onSubmit}>Ajouter</button>
				<ul>
					{todos.length ?
						(
							todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} onToggleTodo={this.onToggleTodo} />))
						) : (
							<p>Chargement...</p>
						)
					}
				</ul>
				<div>
					Filtre:  
					<input type="radio" name="filter" value="all" onChange={this.changeFilter} /> Tous
					<input type="radio" name="filter" value="complete" onChange={this.changeFilter} /> Terminés
					<input type="radio" name="filter" value="todo" onChange={this.changeFilter} /> A faire
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
