// En este caso cargamos el dom primero y luego el script
document.addEventListener('DOMContentLoaded', function(){
    // Primero creamos un  objeto para los datos del formulario
    const datos = {
        nombre: '',
        email: '',
        mensaje: ''
    }
    console.log(datos);


    // Ahora seleccionamos los elementos del formulario
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario #enviar');
    const btnReset = document.querySelector('#formulario #limpiar');

    // Verificamos si esta funcionando
    // console.log(inputNombre);
    // console.log(inputEmail);
    // console.log(inputMensaje);

    // Asignamos los eventos a los inputs
    inputNombre.addEventListener('blur', leerTexto);
    inputEmail.addEventListener('blur', leerTexto);
    inputMensaje.addEventListener('blur', leerTexto);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        reseterFormulario();
    })

    // Creamos la funcion para enviar el email
    function enviarEmail (e){
        e.preventDefault();
        reseterFormulario();
    }

    // Funcion para validar el formulario
    function leerTexto(e){
        if (e.target.value.trim()===''){
            mostrarAlerta(`${e.target.id} no puede estar vacio`, e.target.parentElement);
            datos[e.target.name] = '';
            comprobarEmail();
            return;
        }


        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('Email no valido', e.target.parentElement);
            datos[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignamos los valores al objeto
        datos[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();

    }

    // Funcion para mostrar la alerta
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        // Generamos la alerta
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');

        // Insertamos la alerta
        referencia.appendChild(alerta);
    }

    // Funcion para limpiar la alerta
    function limpiarAlerta(referencia){
        // Comprueba si existe una alerta
        const alerta = referencia.querySelector('.alerta');
        if (alerta){
            alerta.remove();
        };
    }


    // Validamos el email
    function validarEmail(email){
        const expReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const resultado = expReg.test(email);
        return resultado;
    }

    // Comprobamos que el email este correcto
    function comprobarEmail(){
        if (Object.values(datos).includes('')){
            btnEnviar.disabled = false;
            return;
        }

        btnEnviar.disabled = true;
    }

    // Funcion para resetear el formulario
    function reseterFormulario(){
        // Reiniciamos el objeto
        datos.nombre = '';
        datos.email = '';
        datos.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
})