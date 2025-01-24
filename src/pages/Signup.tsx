import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FormValues } from '../models/signup'
import { auth, store } from '../remote/firebase'
import Form from './../components/signup/Form'
import { collection, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../constants';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formValues : FormValues) => {
    const {email, password, name} = formValues 
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName : name, 
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)


    navigate('/')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
