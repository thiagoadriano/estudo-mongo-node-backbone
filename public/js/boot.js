require.config({
    paths: {
        jQuery: '/js/libs/jquery-3.3.1',
        Underscore: '/js/libs/undescore',
        Backbone: '/js/libs/backbone',
        text: '/js/libs/text',
        templates: '../templates'
    },
    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'SocialNet': ['Backbone']
    }
});

require(['SocialNet'], function(SocialNet){
    SocialNet.initialize();
});