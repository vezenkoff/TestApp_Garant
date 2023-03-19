Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.container.Container',
    
    requires: [
        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel'
    ],

    id:'myMainPage',

    xtype: 'app-main',

    controller: 'main',
    plugins: 'viewport',
    
    viewModel: {
        type: 'main',
    },

    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'window',
            itemId: 'formContainer',
            bodyPadding: 10,
            hidden: true,
            layout: 'fit'
        },{
            // Область меню
            region: 'north',
            itemId: 'toolbarComponent',
            tbar: [{
                text: 'Документы',
                handler: 'onShowClick',
            }]
        },{ 
            // Область таб панели
            region: 'center',
            xtype: 'tabpanel',
            id:'myTabPanel',
            hidden: true,
            items:[
                {
                title: 'Список товаров',
                xtype: 'mygrid',
                id: 'shop',
                forceFit: true,
            }]
        },{ 
            // Область панели пользователя
            xtype: 'panel',
            region: 'east',
            width: 300,
            split: true,
            collapsible: true,
            layout: 'center',
            bind: {
                title: '{name}'
            },

            items: [{
                xtype: 'component',
                margin: '50 0 50 0',
                html: ['Добрый день {login}'],
                bind: {
                    html: ['Добрый день {login}!'] // Дополнительное задание №1
                }
            },{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                },
                items: [{
                    xtype: 'button',
                    text: 'Выход',
                    handler: 'onClickButton'
                }]
            }]

    }]
});

var myshop = Ext.define('MyApp.view.main.MyGrid', {
        extend: 'Ext.grid.Panel',

        xtype: 'mygrid',

        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: ['ID: ',{
                xtype: 'textfield',
                reference: 'fieldNumId',
                hideLabel: true,
                width: 200,
                directAction: 'doNumId'
            }, 'Название: ', {
                xtype: 'textfield',
                reference: 'fieldNameDoc',
                hideLabel: true,
                width: 200,
                directAction: 'doNameDoc',
            }, {
                xtype: 'button',
                text: 'Добавить',
                fieldReference: 'fieldMultiply',
            }],
        }],

        columns: [
            {
                xtype: 'numbercolumn', 
                format: '0',
                text: 'ID', 
                dataIndex: 'numId', 
                width: 50
            },{
                xtype: 'gridcolumn',
                text: 'Название документа', 
                dataIndex: 'nameDoc', 
                width: 200
            },{
                xtype: 'gridcolumn',
                text: 'Описание документа', 
                dataIndex: 'descriptionDoc', 
                width: 300
            },{
                xtype: 'booleancolumn', 
                text: 'Подпись',
                dataIndex: 'signature', 
                trueText: 'Да', 
                falseText: 'Нет',
                width: 100,
                renderer: function (value, meta) {
                    if (value === true) {
                        meta.style = "background-color:green;";
                        return 'Да'
                    } else {
                        return 'Нет'
                    }
                }
            }
        ],

        listeners: {
            itemdblclick: function(grid, record) {
                var container = Ext.getCmp('myMainPage').down('#formContainer');
                var form = Ext.create('Ext.form.Panel', {
                    title: 'Документ № ' + record.get('numId'),
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Название',
                            name: 'name',
                            value: record.get('nameDoc')
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Подписать документ:',
                            name: 'sign',
                            checked: record.get('signature')
                        }
                    ],
                    buttons: [
                        {
                            text: 'Сохранить',
                            handler: function() {
                                var values = form.getValues();
                                record.set('nameDoc', values.name);
                                record.set('signature', values.sign);
                                record.save();
                                form.destroy();
                                container.removeAll();
                                container.hide();
                            }
                        }
                    ]
                });

                container.title = form.title;
                form.title = '';
                container.add(form);
                container.show();
            }
        },

        store: {
            model: 'MyApp.data.Document',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'results'
                }
            }
        }
});

Ext.define('MyApp.data.Document', {
    extend: 'Ext.data.Model',
              
     idProperty: 'numId',
              
     fields: [{
         name: 'numId',
         type: 'int'
     }, {
         name: 'nameDoc',
         type: 'string'
     }, {
         name: 'descriptionDoc',
         type: 'string'
     }, {
         name: 'signature',
         type: 'bool'
     }]
});


