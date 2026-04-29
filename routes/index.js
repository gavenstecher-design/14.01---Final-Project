var express = require('express');
var router = express.Router();

/* HOMEPAGE (Downtown Donuts) */
router.get('/', function(req, res) {
  res.render('index', { title: 'Downtown Donuts' });
});

/* TODO create (kept, but no longer used on homepage) */
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

/* TODO delete (kept, but no longer used on homepage) */
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

/* COMMENTS (GET with pagination) */
router.get('/comments', function(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  req.db.query('SELECT COUNT(*) AS total FROM comments', (countErr, countResults) => {
    if (countErr) {
      console.error('Error counting comments:', countErr);
      return res.render('comments', {
        title: 'Customer Comments',
        comments: [],
        error: 'Sorry, comments could not be loaded right now.',
        page: 1,
        totalPages: 1
      });
    }

    const totalComments = countResults[0].total;
    const totalPages = Math.ceil(totalComments / limit) || 1;

    req.db.query(
      'SELECT *, DATE_FORMAT(CONVERT_TZ(created_at, "+00:00", "-06:00"), "%M %d, %Y at %h:%i %p") AS formatted_date FROM comments ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset],
      (err, results) => {
        if (err) {
          console.error('Error fetching comments:', err);
          return res.render('comments', {
            title: 'Customer Comments',
            comments: [],
            error: 'Sorry, comments could not be loaded right now.',
            page: 1,
            totalPages: 1
          });
        }

        res.render('comments', {
          title: 'Customer Comments',
          comments: results,
          error: null,
          page: page,
          totalPages: totalPages
        });
      }
    );
  });
});

/* COMMENTS (POST with validation) */
router.post('/comments', function(req, res) {
  let { name, comment } = req.body;

  name = name ? name.trim() : '';
  comment = comment ? comment.trim() : '';

  if (!name || !comment) {
    return res.render('comments', {
      title: 'Customer Comments',
      comments: [],
      error: 'Name and comment are required.',
      page: 1,
      totalPages: 1
    });
  }

  if (name.length > 100) {
    return res.render('comments', {
      title: 'Customer Comments',
      comments: [],
      error: 'Name must be 100 characters or less.',
      page: 1,
      totalPages: 1
    });
  }

  if (comment.length > 500) {
    return res.render('comments', {
      title: 'Customer Comments',
      comments: [],
      error: 'Comment must be 500 characters or less.',
      page: 1,
      totalPages: 1
    });
  }

  req.db.query(
    'INSERT INTO comments (name, comment) VALUES (?, ?)',
    [name, comment],
    (err) => {
      if (err) {
        console.error('Error adding comment:', err);
        return res.render('comments', {
          title: 'Customer Comments',
          comments: [],
          error: 'Sorry, your comment could not be posted right now.',
          page: 1,
          totalPages: 1
        });
      }

      res.redirect('/comments');
    }
  );
});

module.exports = router;