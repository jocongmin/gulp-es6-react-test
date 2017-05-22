import parallel from 'async/parallel';
parallel({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 3000);
    },
    two: function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 1000);
    }
}, function(err, results) {
    console.log(results)
});