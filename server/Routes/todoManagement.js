const Todo = require('../models/todoSchema');
const List = require('../models/listSchema');
const {decodeToken} = require('../utils/jwtUtils');

module.exports = {
    addTodo: (req, res) => {
        let {value, listId} = req.body;

        Todo.findOne({message: value}, async (err, todo) => {
            if (err) throw err;
            if (!todo) {
                try {
                    const newTodo = new Todo({
                        listId: listId,
                        message: value,
                        importance: 'not_priority',
                        status: 'TO-DO'
                    });
                    let saveTodo = await newTodo.save();
                    return res.status(200).send(saveTodo);
                } catch (err) {
                    console.log('err' + err);
                    res.status(200).send(err);
                }
            } else {
                console.log('Todo already created');
                return res.status(200).send('Todo already created !');
            }
        });
    },
    changeListTitle: (req, res) => {
        let {title, listId} = req.body;

        if (title && listId && title.length && listId.length) {
            List.findOne({listId: listId}, (err, list) => {
                list.title = title;
                list.save(err => {
                    return res.status(200).send(title);
                });
            })
        }
    },
    changePriority: (req, res) => {
        let {content} = req.body;
        let data;

        Todo.findOne({message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.importance === 'not_priority') {
                    data = await Todo.findOneAndUpdate({message: content}, {importance: 'priority'});
                } else if (doc.importance === 'priority') {
                    data = await Todo.findOneAndUpdate({message: content}, {importance: 'urgent'});
                } else {
                    data = await Todo.findOneAndUpdate({message: content}, {importance: 'not_priority'});
                }
                return res.status(200).send(data);
            }
        });
    },
    changeStatus: (req, res) => {
        let {content} = req.body;
        let data;

        Todo.findOne({message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.status === 'TO-DO') {
                    data = await Todo.findOneAndUpdate({message: content}, {status: 'DOING'});
                } else if (doc.status === 'DOING') {
                    data = await Todo.findOneAndUpdate({message: content}, {status: 'DONE'});
                } else {
                    data = await Todo.findOneAndUpdate({message: content}, {status: 'TO-DO'});
                }
                return res.status(200).send(data);
            }
        });
    },
    eraseTodo: (req, res) => {
        let {content} = req.body;

        Todo.findOneAndDelete({message: content}, (err, doc) => {
            if (err) {
                return res.status(200).send('An error occured...');
            } else {
                return res.status(200).send(doc);
            }
        });
    },
    getList: (req, res) => {
        let {token} = req.query;

        if (token && token.length) {
            let id = decodeToken(token).token;
            if (id && id.length) {
                List.find({ownerId: id}, (err, list) => {
                    if (list.length) {
                        return res.status(200).send(list);
                    } else {
                        let list = new List({
                            ownerId: id,
                            listId: Math.random().toString(36).substr(2, 9),
                            title: 'My awesome To-do'
                        });
                        list.save();
                    }
                })
            }
        }
    },
    getTodo: (req, res) => {
        let {listId} = req.query;

        if (listId && listId.length) {
            Todo.find({listId: listId}, (err, todo) => {
                return res.status(200).send(todo);
            })
        }
    }
};