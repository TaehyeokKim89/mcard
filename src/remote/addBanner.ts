import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '../constants'
import { AddBanner } from '../models/card'

export async function getAddBanners() {
  const addBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  return addBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AddBanner),
  }))
}
