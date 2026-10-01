module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: ['steps/**/*.js', 'support/**/*.js'],
        requireModule: [],
        format: ['progress'],
        publishQuiet: true,
        forceExit: true
    }
}