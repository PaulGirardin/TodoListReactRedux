import React from 'react';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.toggleTodo = this.toggleTodo.bind(this);
	}

	toggleTodo(i) {
		this.props.onToggleTodo(i);
	}

	render() {
		const todo = this.props.todo;

		return (
			<li className={(todo.complete ? 'done' : '')} onClick={() => this.props.onToggleTodo(this.props.index)}>
				{ todo.label }
		 	</li>
		);
	}
}

export default Todo;