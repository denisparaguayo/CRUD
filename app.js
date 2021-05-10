// Initialize Cloud Firestore through Firebase
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBV2qY_zUEZN05ufY22fOLsdCtsnA9Xj0g",
    authDomain: "crud-prueba-a3dad.firebaseapp.com",
    projectId: "crud-prueba-a3dad"
  });
  
  var db = firebase.firestore()

  
  
  function guardar(){
      
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const fecha = document.getElementById('fecha').value;

      db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });


  };


  var tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  //leer documentos
  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML +=
        `<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}',)">Editar</button></td>
      </tr>`
    });
});


function eliminar(id){
    
    //borrar documentos 
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
};

//editar

function editar(id,nombre,apellido,fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){

        var washingtonRef = db.collection("users").doc(id);
        
        // Set the "capital" field of the city 'DC'

        const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const fecha = document.getElementById('fecha').value;
        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

}
  