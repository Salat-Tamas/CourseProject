const users = []; // This should be replaced with a proper database in a real application

class AuthController {
    getLogin(req, res) {
        res.render('login', { error: null });
    }

    postLogin(req, res) {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            req.session.user = user;
            
            // Redirect to the stored URL or default to profile
            const returnTo = req.session.returnTo || '/profile';
            delete req.session.returnTo;
            
            res.redirect(returnTo);
        } else {
            res.render('login', { 
                error: 'Invalid username or password',
                values: { username }
            });
        }
    }

    getRegister(req, res) {
        res.render('register', { error: null });
    }

    postRegister(req, res) {
        const { username, password, confirmPassword } = req.body;
        
        // Basic validation
        if (!username || !password) {
            return res.render('register', {
                error: 'Username and password are required',
                values: { username }
            });
        }
        
        if (password !== confirmPassword) {
            return res.render('register', {
                error: 'Passwords do not match',
                values: { username }
            });
        }
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            return res.render('register', {
                error: 'Username already exists',
                values: { username }
            });
        }
        
        const user = { username, password };
        users.push(user);
        
        req.session.user = user;
        res.redirect('/profile');
    }

    getProfile(req, res) {
        res.render('profile', { user: req.session.user });
    }

    postLogout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/profile');
            }
            res.redirect('/login');
        });
    }
}

module.exports = AuthController;