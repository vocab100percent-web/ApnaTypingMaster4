<script type="module">

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOOwBptsSqOsXppUSlo5thpaVSub82jqk",
  authDomain: "apna-typing-master-4.firebaseapp.com",
  projectId: "apna-typing-master-4",
  storageBucket: "apna-typing-master-4.firebasestorage.app",
  messagingSenderId: "749683047827",
  appId: "1:749683047827:web:63c1565d8e42857edc7c66"
};

// ✅ Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Export OTP functions
export { RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword };

</script>
