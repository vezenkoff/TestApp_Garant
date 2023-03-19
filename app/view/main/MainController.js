Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onClickButton: function () {

        localStorage.removeItem('MyLoggedIn');

        this.getView().destroy();

        Ext.widget('login');

    },

    // Дополнительное задание №1
    onShowClick: function(btn) {
        var tabPanel = Ext.getCmp('myTabPanel');
    
        if (tabPanel.isHidden()) {
            tabPanel.show();
            tabPanel.setActiveTab(0);
        }
    }

});