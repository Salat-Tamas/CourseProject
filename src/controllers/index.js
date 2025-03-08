class IndexController {
    getHome(req, res) {
        const courses = [
            { id: 1,  title: 'Course 1', description: 'Description for Course 1' },
            { id: 2,  title: 'Course 2', description: 'Description for Course 2' },
            { id: 3,  title: 'Course 3', description: 'Description for Course 3' },
            { id: 4,  title: 'Course 4', description: 'Description for Course 4' },
            { id: 5,  title: 'Course 5', description: 'Description for Course 5' },
            { id: 6,  title: 'Course 6', description: 'Description for Course 6' },
            { id: 7,  title: 'Course 7', description: 'Description for Course 7' },
            { id: 8,  title: 'Course 8', description: 'Description for Course 8' },
            { id: 9,  title: 'Course 9', description: 'Description for Course 9' },
            { id: 10, title: 'Course 10', description: 'Description for Course 10' },
            { id: 11, title: 'Course 11', description: 'Description for Course 11' },
            { id: 12, title: 'Course 12', description: 'Description for Course 12' },
            { id: 13, title: 'Course 13', description: 'Description for Course 13' },
            { id: 14, title: 'Course 14', description: 'Description for Course 14' },
            { id: 15, title: 'Course 15', description: 'Description for Course 15' },
            { id: 16, title: 'Course 16', description: 'Description for Course 16' },
        ];
        res.render('home', { courses });
    }

    getCourse(req, res) {
        const courses = [
            { id: 1,  title: 'Course 1', description: 'Description for Course 1' },
            { id: 2,  title: 'Course 2', description: 'Description for Course 2' },
            { id: 3,  title: 'Course 3', description: 'Description for Course 3' },
            { id: 4,  title: 'Course 4', description: 'Description for Course 4' },
            { id: 5,  title: 'Course 5', description: 'Description for Course 5' },
            { id: 6,  title: 'Course 6', description: 'Description for Course 6' },
            { id: 7,  title: 'Course 7', description: 'Description for Course 7' },
            { id: 8,  title: 'Course 8', description: 'Description for Course 8' },
            { id: 9,  title: 'Course 9', description: 'Description for Course 9' },
            { id: 10, title: 'Course 10', description: 'Description for Course 10' },
            { id: 11, title: 'Course 11', description: 'Description for Course 11' },
            { id: 12, title: 'Course 12', description: 'Description for Course 12' },
            { id: 13, title: 'Course 13', description: 'Description for Course 13' },
            { id: 14, title: 'Course 14', description: 'Description for Course 14' },
            { id: 15, title: 'Course 15', description: 'Description for Course 15' },
            { id: 16, title: 'Course 16', description: 'Description for Course 16' },
        ];
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (course) {
            res.render('course', { course });
        } else {
            res.status(404).send('Course not found');
        }
    }

    getAbout(req, res) {
        res.send('This is the about page.');
    }

    getCreateCourse(req, res) {
        // Check if user is logged in
        if (!req.session.user) {
            return res.redirect('/login');
        }
        
        res.render('create-course');
    }

    createCourse(req, res) {
        // Check if user is logged in
        if (!req.session.user) {
            return res.redirect('/login');
        }
        
        const { title, description } = req.body;
        
        // Basic validation
        if (!title || !description) {
            return res.render('create-course', { 
                error: 'Title and description are required',
                values: { title, description }
            });
        }
        
        // In a real application, you would save the course to a database
        // For now, just redirect to the home page
        res.redirect('/');
    }
}

module.exports = IndexController;