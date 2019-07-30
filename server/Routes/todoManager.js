const todoSchema = require('../models/todoSchema');

module.exports = {
    addTodo: (req, res) => {
        let {value} = req.body;

        todoSchema.findOne({message: value}, async (err, todo) => {
            if (err) throw err;
            if (!todo) {
                try {
                    const newTodo = new todoSchema({
                        id: Math.random().toString(36).substr(2, 9),
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
    changePriority: (req, res) => {
        let {content} = req.body;
        let data;

        todoSchema.findOne({message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.importance === 'not_priority') {
                    data = await todoSchema.findOneAndUpdate({message: content}, {importance: 'priority'});
                } else if (doc.importance === 'priority') {
                    data = await todoSchema.findOneAndUpdate({message: content}, {importance: 'urgent'});
                } else {
                    data = await todoSchema.findOneAndUpdate({message: content}, {importance: 'not_priority'});
                }
                return res.status(200).send(data);
            }
        });
    },
    changeStatus: (req, res) => {
        let {content} = req.body;
        let data;

        todoSchema.findOne({message: content}, async (err, doc) => {
            if (err) {
                return res.status(200).send('An error occurred...');
            } else {
                if (doc.status === 'TO-DO') {
                    data = await todoSchema.findOneAndUpdate({message: content}, {status: 'DOING'});
                } else if (doc.status === 'DOING') {
                    data = await todoSchema.findOneAndUpdate({message: content}, {status: 'DONE'});
                } else {
                    data = await todoSchema.findOneAndUpdate({message: content}, {status: 'TO-DO'});
                }
                return res.status(200).send(data);
            }
        });
    },
    eraseTodo: (req, res) => {
        let {content} = req.body;

        todoSchema.findOneAndDelete({message: content}, (err, doc) => {
            if (err) {
                return res.status(200).send('An error occured...');
            } else {
                return res.status(200).send(doc);
            }
        });
    },
    getTodo: (req, res) => {
        todoSchema.find((err, list) => {
            if (err) throw err;
            return res.status(200).send(list);
        });
    }
};