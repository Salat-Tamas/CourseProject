const users = []; // This should be replaced with a proper database in a real application

class AuthController {
    getLogin(req, res) {
        res.render('login');
    }

    postLogin(req, res) {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            req.session.user = user;
            res.redirect('/profile');
        } else {
            res.redirect('/register'); // Redirect to register page if user is not found
        }
    }

    getRegister(req, res) {
        res.render('register');
    }

    postRegister(req, res) {
        const { username, password } = req.body;
        const user = { username, password };
        users.push(user);
        res.redirect('/login');
    }

    getProfile(req, res) {
        if (req.session && req.session.user) {
            res.render('profile', { user: req.session.user });
        } else {
            res.redirect('/login');
        }
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