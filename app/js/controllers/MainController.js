module.exports = function (User){
    var scope = this;
    var email = window.localStorage.getItem('email');
    var token = window.localStorage.getItem('token');

    if (email && token) {
        User.login(email, token);
    }else {
        User.logout();
    }

    scope.user = User;

    scope.styleLayouts = [{
        name: 'Cerulean',
        url: 'cerulean'
    },{
        name: 'Cosmo',
        url: 'cosmo'
    },{
        name: 'United',
        url: 'united'
    }];

    scope.styleLayout = scope.styleLayouts[0].url;

    scope.updateStyleLayout = function (newStyleLayout)	{
        scope.styleLayout 		= newStyleLayout;
        return false;
    }
};