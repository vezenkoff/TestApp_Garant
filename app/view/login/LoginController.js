Ext.define('MyApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function() {
        var form = this.lookupReference('formLogin');
        var values = form.getValues();
        
        if(values.username === 'admin' && values.password === 'adm123') {
            localStorage.setItem("MyLoggedIn", true);

            this.getView().destroy();

            Ext.widget('app-main');

            Ext.ComponentQuery.query('app-main')[0].getViewModel().set('login', values.username);
        }
        else {
            Ext.Msg.alert('Ошибка!', 'Неверный логин или пароль');
        }
    
    }
});