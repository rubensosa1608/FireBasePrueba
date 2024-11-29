     // Import the functions you need from the SDKs you need
     import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
     // TODO: Add SDKs for Firebase products that you want to use
     // https://firebase.google.com/docs/web/setup#available-libraries
     import { collection, getFirestore, addDoc, getDoc, getDocs, doc, setDoc , onSnapshot} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

     // Your web app's Firebase configuration
     const firebaseConfig = {
       apiKey: "AIzaSyA6a6CR29kwj_cCmktVtnTT10sBbt7mb7c",
       authDomain: "bicic-6c8d0.firebaseapp.com",
       projectId: "bicic-6c8d0",
       storageBucket: "bicic-6c8d0.firebasestorage.app",
       messagingSenderId: "793891264935",
       appId: "1:793891264935:web:4bae94cf104dcc8805be82"
     };
   
     // Initialize Firebase
     const app = initializeApp(firebaseConfig);

     const db = getFirestore(app);

     const getLastID = async () => {
      const docRef = doc(db, "configuracion", "ultimoID");
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        return docSnap.data().valor;
      } else {

        await setDoc(docRef, { valor: 0 });
        return 0;
      }
    };
    
    const updateLastID = async (nuevoID) => {
      const docRef = doc(db, "configuracion", "ultimoID");
      await setDoc(docRef, { valor: nuevoID });
    };

    export const saveBicicleta = async (nombre, marca, precio, tipo) => {
      try {

        const lastID = await getLastID();
        const newID = lastID + 1; 
    
        const bicicletaRef = doc(db, "bicicletas", newID.toString());
    
        await setDoc(bicicletaRef, {
          nombre,
          marca,
          precio,
          tipo,
        });
    
        console.log("Bicicleta guardada con ID:", newID);
    
        await updateLastID(newID);
      } catch (error) {
        console.error("Error al guardar bicicleta:", error.message);
      }
    };

    export const getBicicletas = () => getDocs(collection(db, 'bicicletas'))

    export const onGetBicis = (callback) => onSnapshot(collection(db, 'bicicletas'), callback)


    
     