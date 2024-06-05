const mongoose = require('mongoose');

const WorkLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Development', 'Test', 'Document'],
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ดำเนินการ', 'เสร็จสิ้น', 'ยกเลิก'],
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date(Date.now() + (7 * 60 * 60 * 1000))
  },
  updatedAt: {
    type: Date,
    default: () => new Date(Date.now() + (7 * 60 * 60 * 1000))
  }
});

module.exports = mongoose.model('WorkLog', WorkLogSchema);
