import React, {Component} from 'react'
import {connect} from 'react-redux'
import TodoInput from '../Todo_input'
import {refreshTodo, changePriority, changeStatus, eraseTodo} from '../../actions/todoActions'
import './lists.css'

class List extends Component {
    state = {
        todo: []
    };

    componentDidMount() {
        this.props.dispatch(refreshTodo());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.list !== this.props.list) {
            this.setState({
                todo: nextProps.list
            })
        } else if (nextProps.priority !== this.props.priority || nextProps.status !== this.props.status
            || nextProps.erase !== this.props.erase) {
            this.updateTodo();
            let dropdowns = [...document.querySelectorAll('.dropdown')];
            dropdowns.map(dropdown => {
                return !dropdown.classList.contains('none') ? dropdown.classList.add('none') : undefined;
            });
        }
    }

    toggleDropdown = (e) => {
        let dropdown = document.querySelector(`#dropdown_${e.target.id}`);
        dropdown.classList.contains('none') ? dropdown.classList.remove('none') : dropdown.classList.add('none');
    };

    updateTodo = () => {
        this.props.dispatch(refreshTodo());
    };

    displayTodo = (type, list) => {
        return list.map((todo, i) => {
            let importance = todo.importance.charAt(0).toUpperCase() + todo.importance.slice(1).replace(/[_]+/gm, ' ');
            if (type === todo.status) {
                return (
                    <div className={'todo'} key={i}>
                        <div id={'todo_info_container'}>
                            <div className={`${todo.importance}_todo`}>{importance}</div>
                            <div id={i} className={'more'} onClick={(e) => this.toggleDropdown(e)}/>
                            <div id={`dropdown_${i}`} className={'dropdown none'}>
                                <p className={'dropdown_choice'}
                                   onClick={() => this.props.dispatch(changePriority(todo.message))}>Change priority</p>
                                <p className={'dropdown_choice'}
                                   onClick={() => this.props.dispatch(changeStatus(todo.message))}>Move category</p>
                                <p className={'dropdown_choice'}
                                   onClick={() => this.props.dispatch(eraseTodo(todo.message))}>Erase to-do</p>
                            </div>
                        </div>
                        <p className={'todo_message'}>{todo.message}</p>
                    </div>
                )
            } else {
                return null;
            }
        })
    };

    render() {
        return (
            <div className={'list_container'}>
                <div id={'title'}>{this.props.type}</div>
                <div id={'todo_container'}>
                    {this.displayTodo(this.props.type, this.state.todo)}
                </div>
                {this.props.type === 'TO-DO' && <TodoInput update={this.updateTodo}/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let list = state.todo.todoList;
    let priority = state.todo.priority;
    let status = state.todo.status;
    let erase = state.todo.erase;
    return {
        list,
        priority,
        status,
        erase
    };
}

export default connect(mapStateToProps)(List);