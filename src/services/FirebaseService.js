import firebase from "@/firebase/firebase";

export const auth = firebase.auth();
const db = firebase.database();

class FirebaseService {
  // - *** AUTH API *** -

  checkAuthStateChanged = (func) => auth.onAuthStateChanged(func);

  doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => auth.signOut();

  doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => auth.currentUser.updatePassword(password);

  // - *** User API *** -

  user = (uid) => db.ref(`users/${uid}`);

  users = () => db.ref("users");

  // - *** Category API *** -

  category = (categoryID) => db.ref(`categories/${categoryID}`);

  categories = () => db.ref("categories");

  // - *** Position API *** -

  position = (positionID) => db.ref(`positions/${positionID}`);

  positions = () => db.ref("positions");

  // - *** Waiters API *** -

  waiter = (waiterID) => db.ref(`waiters/${waiterID}`);

  waiters = () => db.ref(`waiters`);

  // - *** Orders API *** -

  order = (orderID) => db.ref(`orders/${orderID}`);

  orders = () => db.ref(`orders`);
}
export default new FirebaseService();
