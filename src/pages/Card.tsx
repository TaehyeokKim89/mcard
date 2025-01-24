/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import FixedBottomButton from '../components/shared/FixedBottomButton'
import Flex from '../components/shared/Flex'
import ListRow from '../components/shared/ListRow'
import Text from '../components/shared/Text'
import Top from '../components/shared/Top'
import { getCard } from '../remote/card'
import { motion } from 'motion/react'
import { useCallback } from 'react'
import useUser from '../hooks/auth/useUser'
import { useAlertContext } from '../contexts/AlertContext'

const CardPage = () => {
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== 'id',
  })

  const moveToApply = useCallback(()=>{
    if(user == null) {
      open({
        title: '로그인이 필요한 기능입니다',
        onButtonClick() {
          navigate(`/signin`)
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={index}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 1,
                delay: index * 0.1
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                left={'v'}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function removeHtmlTags(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

export default CardPage
