import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Message } from "./Components/Message";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./Firebase/firebaseConfig";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  

  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForscroll = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        email: user.email,
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setMessage("");
      divForscroll.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    const unsubscribeForMessages = onSnapshot(
      q,
      (snap) => {
        setMessages(
          snap.docs.map((item) => {
            const id = item.id;
            return { id, ...item.data() };
          })
        );
      }
    );
    return () => {
      unsubscribe();
      unsubscribeForMessages();
    };
  },[]);

  const logouthandle = () => signOut(auth);

  const loginhandle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container bg={"white"} h={"100vh"}>
          <VStack h={"full"} paddingY={4}>
            <Button onClick={logouthandle} colorScheme="red" w={"full"}>
              Logout
            </Button>
            <VStack h={"full"} w={"full"} overflow={"auto"} css={{"&::-webkit-scrollbar":{
              display:'none'
            }}}>
              {messages?.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}
            <div ref={divForscroll}></div>
            </VStack>
            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type Your Message ..."
                />
                <Button colorScheme="red" type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <HStack bg={"white"} justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginhandle} colorScheme={"purple"}>
            Sign In with Gmail
          </Button>
        </HStack>
      )}
    </Box>
  );
}

export default App;
