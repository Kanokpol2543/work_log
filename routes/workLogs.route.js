const express = require('express');
const router = express.Router();
const WorkLog = require('../models/WorkLog.model');

// บันทึกผลการปฏิบัติงานประจำวัน
router.post('/', async (req, res) => {
  try {
    const newWorkLog = new WorkLog(req.body);
    const workLog = await newWorkLog.save();
    res.json(workLog);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// แสดงรายการที่บันทึก และค้นหาตามวันที่ดำเนินการ
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};
    if (date) {
      query = { startTime: { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) } };
    }
    const workLogs = await WorkLog.find(query);
    res.json(workLogs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// แสดงรายงานผลการปฏิบัติงานประจำวัน
router.get('/daily-report', async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};
    if (date) {
      query = { startTime: { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) } };
    }
    const workLogs = await WorkLog.find(query);
    res.json(workLogs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// แสดงรายงานสรุปจำนวนสถานะการทำงานรายเดือน
router.get('/monthly-report', async (req, res) => {
  try {
    const { month } = req.query;
    const start = new Date(month);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    const workLogs = await WorkLog.aggregate([
      {
        $match: {
          startTime: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(workLogs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// ลบข้อมูล
router.delete('/', async (req, res) => {
  try {
    await WorkLog.findByIdAndDelete(req.query.id);
    res.json({ msg: 'WorkLog removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// ปรับปรุงข้อมูล
router.put('/', async (req, res) => {
  try {

    const workLog = await WorkLog.findByIdAndUpdate(
      req.body._id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(workLog);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
