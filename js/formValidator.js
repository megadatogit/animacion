class FormValidator {
    constructor(form) {
        this.form = form;
    }
    // Setters y getters para campos
    set nombre(value) {
        this._nombre = value.trim();
    }
    get nombre() {
        return this._nombre;
    }

    set email(value) {
        this._email = value.trim();
    }
    get email() {
        return this._email;
    }

    set edad(value) {
        this._edad = parseInt(value);
    }
    get edad() {
        return this._edad;
    }

    set fechaNacimiento(value) {
        this._fechaNacimiento = value;
    }
    get fechaNacimiento() {
        return this._fechaNacimiento;
    }

    set terminos(value) {
        this._terminos = value;
    }
    get terminos() {
        return this._terminos;
    }

    set noticias(value) {
        this._noticias = value === "true";
    }
    get noticias() {
        return this._noticias;
    }

    checkValidInput =() => {
        let valid = true;

        //Validar que edad sea mayor o igual a 18
        const terminosInput = this.form.querySelector('#terminos');
        if(!this.terminos) {
            terminosInput.setCustomValidity('Debes aceptar los términos');
            valid = false;
        } else terminosInput.setCustomValidity('');
        terminosInput.reportValidity();

        //Validar que edad sea mayor o igual a 18
        const edadInput = this.form.querySelector('#edad');
        if(isNaN(this.edad) || this.edad < 18) {
            edadInput.setCustomValidity('Tu edad debe ser mayor o igual a 18 años');
            valid = false;
        } else edadInput.setCustomValidity('');
        edadInput.reportValidity();

        //Validar el correo
        const emailInput = this.form.querySelector('#email');
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!regex.test(this.email)) {
            emailInput.setCustomValidity('Correo inválido');
            valid = false;
        } else emailInput.setCustomValidity('');
        emailInput.reportValidity();

        //Validar que nombre no sea menor de 3 caracteres
        const nombreInput = this.form.querySelector('#nombre');
        if(this.nombre.length === "") {
            nombreInput.setCustomValidity('Ingresa un nombre válido');
            valid = false;
        } else nombreInput.setCustomValidity('');
        nombreInput.reportValidity();

        //Validar que nombre no sea menor de 3 caracteres
        const fechaInput = this.form.querySelector('#fechaNacimiento');
        if(this.fechaNacimiento == "") {
            fechaInput.setCustomValidity('Ingresa una fecha');
            valid = false;
        } else fechaInput.setCustomValidity('');
        fechaInput.reportValidity();

        return valid;
    }

    sendForm = () => {
        if(this.form.checkValidity()) {
            //Usando la función submit
            this.form.submit();
            alert("Formulario validado");
            //Usando la función reset
            this.form.reset();

            var intentosExitosos = JSON.parse(localStorage.getItem("intentosExitosos")??0);
            localStorage.setItem("intentosExitosos", (intentosExitosos + 1));
            document.querySelector("#iSuccess").innerHTML = intentosExitosos + 1;

            document.getElementById("btnRegistrar").setAttribute("disabled","disabled");
        } else {
            alert("Datos inválidos");
            var intentosFallidos = JSON.parse(localStorage.getItem("intentosFallidos")??0);
            localStorage.setItem("intentosFallidos", (intentosFallidos + 1));
            document.querySelector("#iFail").innerHTML = intentosFallidos + 1;
        }
    }
}




document.addEventListener("DOMContentLoaded", function(event) {


    document.querySelector("#iSuccess").innerHTML = localStorage.getItem("intentosExitosos");
    document.querySelector("#iFail").innerHTML = localStorage.getItem("intentosFallidos");

    //Obtenemos el form
    const form = document.getElementById('registroForm');
    //Creamos la instancia de la clase
    const instancia = new FormValidator(form);

    // Evento para llamar la función de validación y el submit()
    document.getElementById("btnRegistrar").onclick = function() {
        // Obtener valores y asignar a la clase
        instancia.nombre = form.nombre.value;
        instancia.email = form.email.value;
        instancia.edad = form.edad.value;
        instancia.fechaNacimiento = form.fechaNacimiento.value;
        instancia.terminos = form.terminos.checked;
        instancia.noticias = form.noticias.value;
        //Llamamos la función para validar los inputs
        if(instancia.checkValidInput()) {
            //Si todos los datos son correctos llamamos la función submit
            instancia.sendForm();
        } else {
            var intentosFallidos = JSON.parse(localStorage.getItem("intentosFallidos"));
            localStorage.setItem("intentosFallidos", (intentosFallidos + 1));
            document.querySelector("#iFail").innerHTML = intentosFallidos + 1;
        }

    };

    const terminos = document.getElementById("terminos");

    terminos.addEventListener("change", function() {
        if(!this.checked){
            document.getElementById("btnRegistrar").setAttribute("disabled","disabled");
        } else {
            document.getElementById("btnRegistrar").removeAttribute("disabled");
        }
    });

});
