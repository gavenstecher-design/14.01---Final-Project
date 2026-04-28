var express = require('express');
var router = express.Router();

/* GET home page (TODO app still works) */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { title: 'My Simple TODO', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* TODO create */
router.post('/create', function (req, res, next) {
  const { task } = req.body;
  try {
    req.db.query(
      'INSERT INTO todos (task) VALUES (?);',
      [task],
      (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        res.redirect('/');
      }
    );
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send('Error adding todo');
  }
});

/* TODO delete */
router.post('/delete', function (req, res, next) {
  const { id } = req.body;
  try {
    req.db.query(
      'DELETE FROM todos WHERE id = ?;',
      [id],
      (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        res.redirect('/');
      }
    );
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Error deleting todo');
  }
});

/* PROJECT PAGES */

router.get('/menu', function(req, res) {
  res.render('menu', { title: 'Menu' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Us' });
});

/* COMMENTS (GET) */
router.get('/comments', function(req, res) {
  req.db.query(
    'SELECT * FROM comments ORDER BY created_at DESC',
    (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }
      res.render('comments', {
        title: 'Customer Comments',
        comments: results
      });
    }
  );
});

/* COMMENTS (POST) */
router.post('/comments', function(req, res) {
  const { name, comment } = req.body;

  if (!name || !comment || comment.trim() === '') {
    return res.status(400).send('Invalid input');
  }

  req.db.query(
    'INSERT INTO comments (name, comment) VALUES (?, ?)',
    [name, comment],
    (err) => {
      if (err) {
        console.error('Error adding comment:', err);
        return res.status(500).send('Error adding comment');
      }
      res.redirect('/comments');
    }
  );
});

module.exports = router;