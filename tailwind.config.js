module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.ejs',
        './src/**/**/*.ejs',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FFFFFF', // White
                secondary: '#000000', // Black
                accent: '#FF6347', // Tomato
            },
            fontFamily: {
                cartoon: ['"Fredoka One"', 'cursive'],
            },
        },
    },
    plugins: [],
}