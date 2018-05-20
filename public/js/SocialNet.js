define([
    'view/index'
], function(indexView) {
    var initialize = function(){
        indexView.render();
    };

    return {
        initialize: initialize
    }
});