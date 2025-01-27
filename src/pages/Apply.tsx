import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAppliedCard from '../components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '../components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '../components/apply/hooks/usePollApplyStatus'
import Apply from '../components/apply/Index'
import FullPageLoader from '../components/shared/FullPageLoader'
import { useAlertContext } from '../contexts/AlertContext'
import useUser from '../hooks/auth/useUser'
import { APPLY_STATUS } from '../models/apply'
import { updateApplyCard } from '../remote/apply'

const ApplyPage = () => {
  const navigate = useNavigate()
  const {open } =useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if(applied == null) {
          return
        }
        if(applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다',
            onButtonClick() {
              window.history.back()
            },
          })
          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })
  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    }, // 값이 추가되었을때 => 폴링 시작
    onError: () => {
      window.history.back()
    }, // 실패했을 때 => 폴링 시작
  })

  if ( data !=null &&  data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message='카드를 신청중입니다'/>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
