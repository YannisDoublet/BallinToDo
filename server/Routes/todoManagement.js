const Todo = require('../models/todoSchema');
const List = require('../models/listSchema');
const {decodeToken} = require('../utils/jwtUtils');

module.exports = {
    addList: (req, res) => {
        let {token} = req.body;

        if (token && token.length) {
            let id = decodeToken(token).token;
            if (id && id.length) {
                const newList = new List({
                    ownerId: id,
                    listId: Math.random().toString(36).substr(2, 9),
                    title: 'My awesome To-do List'
                });
                newList.save(() => {
                    List.count({ownerId: id}, (err, count) => {
                        return res.status(200).json({listLength: parseInt(count) - 1});
                    })
                })
            }
        }
    },
    addTodo: (req, res) => {
        let {value, listId, type} = req.body;

        Todo.findOne({listId: listId, message: value}, async (err, todo) => {
            if (err) throw err;
            if (!todo) {
                try {
                    const newTodo = new Todo({
                        listId: listId,
                        message: value,
                        importance: 'not_priority',
                        status: type
                    });
                    let saveTodo = await newTodo.save();
                    return res.status(200).send(saveTodo);
                } catch (err) {
                    res.status(200).send(err);
                }
            } else {
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
        let {content, listId} = req.body;
        let data;

        Todo.findOne({listId: listId, message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.importance === 'not_priority') {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {importance: 'priority'});
                } else if (doc.importance === 'priority') {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {importance: 'urgent'});
                } else {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {importance: 'not_priority'});
                }
                return res.status(200).send(data);
            }
        });
    },
    changeStatus: (req, res) => {
        let {content, listId} = req.body;
        let data;

        Todo.findOne({listId: listId, message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.status === 'TO-DO') {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {status: 'DOING'});
                } else if (doc.status === 'DOING') {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {status: 'DONE'});
                } else {
                    data = await Todo.findOneAndUpdate({listId: listId, message: content}, {status: 'TO-DO'});
                }
                return res.status(200).send(data);
            }
        });
    },
    getList: (req, res) => {
        let {token} = req.body;

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
                        list.save(() => {
                            List.find({ownerId: id}, (err, list) => {
                                if (list.length) {
                                    return res.status(200).send(list);
                                }
                            });
                        })
                    }
                })
            } else {
                return res.status(200).send('Error');
            }
        } else {
            return res.status(200).send('No token');
        }
    },
    getTodo: (req, res) => {
        let {listId} = req.query;

        if (listId && listId.length) {
            Todo.find({listId: listId}, (err, todo) => {
                return res.status(200).send(todo);
            })
        }
    },
    eraseTodo: (req, res) => {
        let {content, listId, type} = req.body;

        Todo.findOneAndDelete({listId: listId, message: content, type: type}, (err, doc) => {
            if (err) {
                return res.status(200).send('An error occured...');
            } else {
                return res.status(200).send(doc);
            }
        });
    },
    deleteList: (req, res) => {
        let {token, listId} = req.body;

        if (token && token.length && listId && listId.length) {
            let id = decodeToken(token).token;
            if (id && id.length) {
                List.findOneAndDelete({listId: listId}, (err, doc) => {
                    Todo.remove({listId: listId}, (err, doc) => {
                        return res.status(200).json({active: 0})
                    })
                })
            } else {
                return res.status(200).send('Error')
            }
        }
    }
};
