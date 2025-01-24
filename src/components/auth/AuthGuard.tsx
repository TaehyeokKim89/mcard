import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../../atoms/user'
import { auth } from '../../remote/firebase'

//인증 처리
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // if(인증처리가 안됐어) { return null}
  // 인증처리가 됐다 children 리턴
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialize(true)
  })

  if (initialize === false) {
    return <div>인증 처리중 ... 로딩중 ....</div>
  }
  return <>{children}</>
}

export default AuthGuard
