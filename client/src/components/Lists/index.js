import React, {Component} from 'react'
import {connect} from 'react-redux'
import TodoInput from '../Todo_input'
import {getTodo, changePriority, changeStatus, eraseTodo} from '../../actions/todoActions'
import './lists.css'

class List extends Component {
    state = {
        todo: [],
        scrollDown: false
    };

    componentDidMount() {
        // this.props.dispatch(refreshTodo(localStorage.getItem('T')));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.todo.length !== this.state.todo.length && this.state.scrollDown) {
            let objDiv = document.getElementById("todo_container");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.list !== this.props.list) {
            if (nextProps.list !== 'Error' && nextProps.list) {
                this.props.dispatch(getTodo(nextProps.list[nextProps.active].listId));
            }
        } else if (nextProps.active !== this.props.active) {
            if (this.props.list) {
                this.props.dispatch(getTodo(this.props.list[nextProps.active].listId));
            }
        } else if (nextProps.todo !== this.props.todo) {
            this.setState({
                todo: nextProps.todo
            })
        } else if (nextProps.priority !== this.props.priority || nextProps.status !== this.props.status
            || nextProps.erase !== this.props.erase) {
            this.props.dispatch(getTodo(this.props.list[this.props.active].listId));
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
        let {scrollDown} = this.state;
        this.props.dispatch(getTodo(this.props.list[this.props.active].listId));
        if (scrollDown === false) {
            this.setState({
                scrollDown: true
            })
        }
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
                            <div id={`dropdown_${i}`} className={'dropdown clearfix none'}>
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
        let {todo} = this.state;
        let {type} = this.props;
        let listId = this.props.list && this.props.active !== undefined ? this.props.list[this.props.active].listId : undefined;
        return (
            <div className={'list_container'}>
                <div id={'title'}>{this.props.type}</div>
                <div id={'todo_container'}>
                    {this.displayTodo(type, todo)}
                </div>
                <TodoInput update={this.updateTodo} listId={listId} type={this.props.type}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let list = state.todo.todoList;
    let active = state.todo.active;
    let todo = state.todo.todo;
    let priority = state.todo.priority;
    let status = state.todo.status;
    let erase = state.todo.erase;
    return {
        list,
        active,
        priority,
        status,
        erase,
        todo
    };
}

export default connect(mapStateToProps)(List);