const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

console.log('DASHBOARD API HIT');

router.get('/', auth, async (req, res) => {
  try {
    const pageNum = parseInt(req.query.page) || 1;
    const limitParam = req.query.limit;
    const search = req.query.search || '';
    const sort = req.query.sort;

    const pageSize = 10;
    const offset = (pageNum - 1) * pageSize;
    const usePagination = limitParam !== 'all';

    // whitelist kolom sort
    const allowedSort = ['name', 'department', 'waktuMasuk'];
    const sortColumn = allowedSort.includes(sort) ? sort : 'name';

    let sql = `
      SELECT id, name, department, waktuMasuk, status
      FROM employees
    `;

    const params = [];

    if (search) {
      sql += ` WHERE name LIKE ? OR department LIKE ? `;
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY ${sortColumn} `;

    if (usePagination) {
      sql += ` LIMIT ? OFFSET ? `;
      params.push(pageSize, offset);
    }

    console.log('SQL:', sql);
    console.log('PARAMS:', params);

    const [rows] = await db.query(sql, params);

    res.json({
      role: req.user.role,
      data: rows
    });

  } catch (err) {
    console.error('DASHBOARD ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
});
//waktu masuk ditambahkan
// check-in (semua role boleh)
router.post('/checkin/:id', auth, async (req, res) => {
  console.log('CHECKIN HIT', req.params.id, req.user);
  try {
    const [result] = await db.query(
      'UPDATE employees SET waktuMasuk = NOW(), status = CASE WHEN TIME(NOW()) > "07:00:00" THEN "Terlambat" ELSE "Tepat Waktu" END WHERE id = ?',
      [req.params.id]
    );

    console.log('AFFECTED:', result.affectedRows);

    res.json({ message: 'Check-in berhasil' });
  } catch (err) {
    console.error('CHECKIN ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
});

//edit (admin dan editor only)
router.put('/:id', auth, async (req, res) => {
  if (!['Admin', 'Editor'].includes(req.user.role)) {
    return res.sendStatus(403);
  }

  const { id } = req.params;
  const { name, department } = req.body;

  try {
    await db.query(
      'UPDATE employees SET name=?, department=?, status=? WHERE id=?',
      [name, department, 'Tepat Waktu', id]
    );

    res.json({ message: 'Data berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: 'Update gagal' });
  }
});

//delete (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.sendStatus(403);
  }

  try {
    await db.query('DELETE FROM employees WHERE id=?', [req.params.id]);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Delete gagal' });
  }
});


module.exports = router;
