const users = [];

module.exports = {
  find: (username, password) =>
    users.find(u => u.username === username && u.password === password),

  validateAndCreate: (username, password, confirmPassword) => {
    if (!username || !password) return 'Username and password are required';
    if (password !== confirmPassword) return 'Passwords do not match';
    if (users.some(u => u.username === username)) return 'Username exists';
    users.push({ username, password });
    return null;
  }
};