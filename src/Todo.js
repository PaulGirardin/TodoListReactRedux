import React from 'react';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.toggleTodo = this.toggleTodo.bind(this);
	}

	toggleTodo(i) {
		this.props.onToggleTodo(i);
	}

	shouldComponentUpdate(){
		return true;
	}

	render() {
		const todo = this.props.todo;
		return (
			<li onClick={() => this.props.onToggleTodo(this.props.index)} 
				className={(todo.complete ? 'done' : '')}>
			{ todo.label }
		 	</li>
		);
	}
}
export default Todo;