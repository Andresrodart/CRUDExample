(function($){
    //$('#gameHolder').on("gameEnd", {foo: "bar"}, function( event, arg1 ) {
        //event.preventDefault();
        //
    'use strict';
    var userData = [];  
        
            // Update table according to data
            var updateTable = function() {
                var dataTable = document.getElementById('table1'),
                    tableHead = document.getElementById('table-head'),
                    tbody = document.createElement('tbody');
        
                while (dataTable.firstChild)
                    dataTable.removeChild(dataTable.firstChild);
        
                dataTable.appendChild(tableHead);
        
                for (var i = 0; i < userData.length; i++) {
                    var tr = document.createElement('tr'),
                        td0 = document.createElement('td'),
                        td1 = document.createElement('td'),
                        td2 = document.createElement('td'),
                        td3 = document.createElement('td'),
                        td4 = document.createElement('td'),
                        td5 = document.createElement('td'),
                        td6 = document.createElement('td'),
                        btnDelete = document.createElement('input'),
                        btnEdit = document.createElement('input');
        
                    btnDelete.setAttribute('type', 'button');
                    btnDelete.setAttribute('value', 'Delete');
                    btnDelete.setAttribute('class', 'btnDelete');
                    btnDelete.setAttribute('id', i);
        
                    btnEdit.setAttribute('type', 'button');
                    btnEdit.setAttribute('value', 'Edit');
                    btnEdit.setAttribute('id', i);
        
                    tr.appendChild(td0);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
        
                    td0.innerHTML = i + 1;
                    td1.innerHTML = userData[i].nombre;
                    td2.innerHTML = userData[i].apellidos;
                    td3.innerHTML = userData[i].numeroDeReferencia;
                    td4.innerHTML = userData[i].calfExamen;
                    td5.appendChild(btnEdit);
                    td6.appendChild(btnDelete);
        
        
                    btnDelete.onclick = (function() {
                        return function() {
                            if (confirm("Are you sure you want to delete "+ userData[this.getAttribute('id')].numeroDeReferencia +"?")) {
                                var deleteId = this.getAttribute('id');
                                $.post('/admin/CRUD',  {'delete':userData[deleteId].numeroDeReferencia}, function( data ) {
                                    updateTable();
                                });
                                userData.splice(deleteId, 1);
                                updateTable();
                                refreshForm();
                            }
                        };
                    })();
        
                    btnEdit.addEventListener('click', function() {
                        var editId = this.getAttribute('id');
                        window.scrollTo({
                                top: 0, 
                                left: 0, 
                                behavior: 'smooth' 
                            });
                        updateForm(editId);
                    }, false);
        
                    tbody.appendChild(tr);
                }
                dataTable.appendChild(tbody);
            }
        
            // Set form for data edit
            var updateForm = function(id) {
                var nameField = document.getElementById('name'),
                    phoneField = document.getElementById('phone'),
                    saveButton = document.getElementById('btnSave'),
                    apellidosField = document.getElementById('Apellidos'),
                    NReferenciaField = document.getElementById('NReferencia'),
                    FechaNField = document.getElementById('FechaN'),
                    LugarNField = document.getElementById('LugarN'),
                    sexField = document.getElementById('sex'),
                    CurpField = document.getElementById('Curp'),
                    DirField = document.getElementById('Dir'),
                    correoField = document.getElementById('correo'),
                    EscuelaPField = document.getElementById('EscuelaP'),
                    promedioField = document.getElementById('promedio'),
                    CalfExField = document.getElementById('CalfEx');
                
                apellidosField.value = userData[id].apellidos;
                NReferenciaField.value = userData[id].numeroDeReferencia;
                FechaNField.value = userData[id].fechaDeNacieminto.substring(0, 10);
                LugarNField.value = userData[id].lugarDeNacieminto;
                sexField.value = userData[id].sexo;
                CurpField.value = userData[id].curp;
                DirField.value = userData[id].dirección;
                correoField.value = userData[id].correo;
                EscuelaPField.value = userData[id].escuelaDeProcedencia;
                promedioField.value = userData[id].promedio;
                CalfExField.value = userData[id].calfExamen;
                nameField.value = userData[id].nombre;
                phoneField.value = userData[id].telefono;
                saveButton.value = 'Update';
                saveButton.setAttribute('data-update', id);
            }
        
            // Save new data
            var saveData = function() {
                var newName = document.getElementById('name').value,
                    newPhone = document.getElementById('phone').value,
                    datatoAdd = {
                        name: newName,
                        phone: newPhone
                    };
        
                userData.push(datatoAdd);
                updateTable();
            }
        
            // Update data
            var updateData = function(id) {
                var upName = document.getElementById('name').value,
                    upPhone = document.getElementById('phone').value,
                    apellidosField = document.getElementById('Apellidos').value,
                    NReferenciaField = document.getElementById('NReferencia').value,
                    FechaNField = document.getElementById('FechaN').value,
                    LugarNField = document.getElementById('LugarN').value,
                    sexField = document.getElementById('sex').value,
                    CurpField = document.getElementById('Curp').value,
                    DirField = document.getElementById('Dir').value,
                    correoField = document.getElementById('correo').value,
                    EscuelaPField = document.getElementById('EscuelaP').value,
                    promedioField = document.getElementById('promedio').value,
                    CalfExField = document.getElementById('CalfEx').value,
                    guide = NReferenciaField;
        
                userData[id].apellidos = apellidosField ;
                userData[id].numeroDeReferencia = NReferenciaField ;
                userData[id].fechaDeNacieminto = FechaNField;
                userData[id].lugarDeNacieminto = LugarNField ;
                userData[id].sexo = sexField ;
                userData[id].curp = CurpField ;
                userData[id].dirección = DirField ;
                userData[id].correo = correoField ;
                userData[id].escuelaDeProcedencia = EscuelaPField ;
                userData[id].promedio = promedioField ;
                userData[id].calfExamen = CalfExField ;
                userData[id].nombre = upName;
                userData[id].telefono = upPhone;
                
                $.post('/admin/CRUD',  userData[id], function( data ) {
                    updateTable();
                });
            }
        
            // Reset the form
            var refreshForm = function() {
                var nameField = document.getElementById('name'),
                    phoneField = document.getElementById('phone'),
                    saveButton = document.getElementById('btnSave'),
                    apellidosField = document.getElementById('Apellidos'),
                    NReferenciaField = document.getElementById('NReferencia'),
                    FechaNField = document.getElementById('FechaN'),
                    LugarNField = document.getElementById('LugarN'),
                    sexField = document.getElementById('sex'),
                    CurpField = document.getElementById('Curp'),
                    DirField = document.getElementById('Dir'),
                    correoField = document.getElementById('correo'),
                    EscuelaPField = document.getElementById('EscuelaP'),
                    promedioField = document.getElementById('promedio'),
                    CalfExField = document.getElementById('CalfEx');
        
                nameField.value = '';
                phoneField.value = '';
                apellidosField.value = '';
                NReferenciaField.value = '';
                FechaNField.value = '';
                LugarNField.value = '';
                sexField.value = '';
                CurpField.value = '';
                DirField.value = '';
                correoField.value = '';
                EscuelaPField.value = '';
                promedioField.value = '';
                CalfExField.value = '';
                saveButton.value = 'Save';
                saveButton.removeAttribute('data-update');
            }
        
            // Main function
            var init = function() {
                $.post('/admin/CRUD', {'arg1':'2'}, function( data ) {
                    userData=data;
                    updateTable();
                });
                
                var btnSave = document.getElementById('btnSave'),
                    btnRefresh = document.getElementById('btnRefresh');
        
                btnSave.onclick = function() {
                    if (btnSave.getAttribute('data-update')) {
                        updateData(btnSave.getAttribute('data-update'));
                    } else {
                        saveData();
                    }
                    refreshForm();
                };
        
                /*btnRefresh.onclick = function() {
                    refreshForm();
                };*/
            };
        
            init(); //Intialize the table
        //});
    //})
})(jQuery); // end of jQuery name space

