/** @jsxImportSource @emotion/react */
import Button from '../Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '../../../remote/firebase'
import { addBanners } from '../../../mock/data'
import { COLLECTIONS } from '../../../constants'

const AddBannerListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    addBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      batch.set(docRef, banner)
    })
    await batch.commit()
    alert('배너 리스트 추가 완료')
  }
  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AddBannerListAddButton
