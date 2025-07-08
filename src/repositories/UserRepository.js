// src/repositories/UserRepository.js
const { sheets, spreadsheetId } = require('../config/database');
const getLocalDateTime = require('../utils/getLocalDateTime');
const range = 'users!A2:J';

const userMapper = {
  fromSheetRow(row) {
    console.log(row)
    return {
      id: Number(row[0]),
      name: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      password: row[4] || '',
      remember_token: row[5] || '',
      email_verified_at: row[6] || '',
      active: row[7] === 'TRUE',
      created_at: row[8] || '',
      updated_at: row[9] || '',
    };
  },
};

const userRepository = {
  async getLastId() {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    const values = response.data.values || [];
    if (!values.length) return 1;

    const ids = values.map(row => parseInt(row[0])).filter(id => !isNaN(id));
    return Math.max(...ids, 0) + 1;
  },

  async create(userData) {
    const id = await this.getLastId();
    const now = getLocalDateTime();

    const newUser = [
      id,
      userData.name,
      userData.email,
      userData.phone || '',
      userData.password,
      userData.remember_token || '',
      userData.email_verified_at || '',
      String(userData.active ?? false),
      now,
      now,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [newUser] },
    });

    return { id, ...userData, created_at: now, updated_at: now };
  },

  async getAll() {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    const rows = response.data.values || [];
    return rows.map(userMapper.fromSheetRow);
  },

  async find(id) {
    const users = await this.getAll();
    return users.find(u => u.id === Number(id)) || null;
  },

  async findByEmail(email) {
    const users = await this.getAll();
    return users.find(u => u.email === email) || null;
  },

  async update(id, data) {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => Number(row[0]) === Number(id));
    if (rowIndex === -1) return null;

    const updatedRow = [
      Number(id),
      data.name || rows[rowIndex][1],
      data.email || rows[rowIndex][2],
      data.phone || rows[rowIndex][3],
      data.password || rows[rowIndex][4],
      data.remember_token || rows[rowIndex][5],
      data.email_verified_at || rows[rowIndex][6],
      data.active !== undefined ? String(data.active) : rows[rowIndex][7],
      rows[rowIndex][8],
      getLocalDateTime(),
    ];

    const targetRow = rowIndex + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `users!A${targetRow}:J${targetRow}`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [updatedRow] },
    });

    return userMapper.fromSheetRow(updatedRow);
  },
};

module.exports = userRepository;