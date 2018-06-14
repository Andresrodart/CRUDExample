(function($){
    'use strict';
    var userData = [];
    var init = function() {
        
        var Aciertos = document.getElementById('Aciertos'),
            Escuelas = document.getElementById('Escuelas'),
            Residencias = document.getElementById('Residencias'),
            EdadSexo = document.getElementById('EdadSexo');

        Aciertos.onclick = function() {
            $.post('/admin/report', {'arg':'Aciertos'}, function( data ) {
                var aux = [];
                for (let index = 0; index < data.length; index++)
                    if(data[index].calfExamen)    
                        aux.push(data[index].calfExamen.toString())
                var Pdata = [
                    {
                      x: [],
                      y: [],
                      type: 'bar'
                    }
                  ];
                
                Pdata[0].x = aux.unique();
                Pdata[0].y = new Array(Pdata[0].x.length)
                for (let index = 0; index < Pdata[0].x.length; index++)
                    Pdata[0].y[index] = aux.times(Pdata[0].x[index]);  
                console.log(Pdata);                   
                Plotly.newPlot('myDiv', Pdata);
            });
        };

        Escuelas.onclick = function() {
            $.post('/admin/report', {'arg':'Aciertos'}, function( data ) {
                var aux = [];
                for (let index = 0; index < data.length; index++)
                    if(data[index].escuelaDeProcedencia)    
                        aux.push(data[index].escuelaDeProcedencia.toString())
                console.log(aux); 
                var Pdata = [
                    {
                      x: [],
                      y: [],
                      type: 'bar'
                    }
                  ];
                
                Pdata[0].x = aux.unique();
                Pdata[0].y = new Array(Pdata[0].x.length)
                for (let index = 0; index < Pdata[0].x.length; index++)
                    Pdata[0].y[index] = aux.times(Pdata[0].x[index]);  
                console.log(Pdata);                   
                Plotly.newPlot('myDiv', Pdata);
            });
        };

        Residencias.onclick = function() {
            $.post('/admin/report', {'arg':'Aciertos'}, function( data ) {
                var aux = [];
                for (let index = 0; index < data.length; index++)
                    if(data[index].lugarDeNacieminto)    
                        aux.push(data[index].lugarDeNacieminto.toString())
                console.log(aux); 
                var Pdata = [
                    {
                      x: [],
                      y: [],
                      type: 'bar'
                    }
                  ];
                
                Pdata[0].x = aux.unique();
                Pdata[0].y = new Array(Pdata[0].x.length)
                for (let index = 0; index < Pdata[0].x.length; index++)
                    Pdata[0].y[index] = aux.times(Pdata[0].x[index]);  
                console.log(Pdata);                   
                Plotly.newPlot('myDiv', Pdata);
            });
        };

        EdadSexo.onclick = function() {
            $.post('/admin/report', {'arg':'Aciertos'}, function( data ) {
                var aux = [];
                for (let index = 0; index < data.length; index++)
                    if(data[index].sexo)    
                        aux.push(data[index].sexo.toString())
                console.log(aux); 
                var Pdata = [
                    {
                      x: [],
                      y: [],
                      type: 'bar'
                    }
                  ];
                
                Pdata[0].x = aux.unique();
                Pdata[0].y = new Array(Pdata[0].x.length)
                for (let index = 0; index < Pdata[0].x.length; index++)
                    Pdata[0].y[index] = aux.times(Pdata[0].x[index]);  
                console.log(Pdata);                   
                Plotly.newPlot('myDiv', Pdata);
            
                aux = new Array();
                for (let index = 0; index < data.length; index++)
                    if(data[index].fechaDeNacieminto)    
                        aux.push((new Date()).getFullYear() - new Date(data[index].fechaDeNacieminto).getFullYear());
                console.log(aux); 
                var Pdata2 = [
                    {
                      x: [],
                      y: [],
                      type: 'bar'
                    }
                  ];
                
                Pdata2[0].x = aux.unique();
                Pdata2[0].y = new Array(Pdata2[0].x.length)
                for (let index = 0; index < Pdata2[0].x.length; index++)
                    Pdata2[0].y[index] = aux.times(Pdata2[0].x[index]);  
                console.log(Pdata2);                   
                Plotly.newPlot('myDiv2', Pdata2);
            
            });
        };

    };

    init();
})(jQuery);

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

Array.prototype.times = function(value) {
    var times = 0;
    for(var i = 0; i < this.length; i++)
        if(this[i] === value)
            times++;
    return times; 
}