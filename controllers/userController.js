const express = require('express');
const users = require('../data/users');

const register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ msg: 'User already exists' });
  }
  users.push({ username, password });
  res.json({ msg: 'User registered' });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ msg: 'Login successful' });
  res.status(401).json({ msg: 'Invalid credentials' });
};

module.exports = { register, login };
