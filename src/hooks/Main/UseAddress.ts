import { useState, useEffect } from 'react'
import { addressRequest } from '../../types/Main/AddressRequest'
import { addressResponse } from '../../types/Main/AddressResponse'
import defaultAxios from '../../api/defaultAxios'
import useAddressStore from '../../store/useAddressStore'

declare global {
  interface Window {
    kakao: any
  }
}

export const useAddress = () => {
  const { addresses, addAddress } = useAddressStore()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [userLocation, setUserLocation] = useState<addressResponse | undefined>(
    undefined
  )
  const [address, setAddress] = useState('')

  useEffect(() => {
    // 사용자 위치 바탕으로 도로명 주소 뽑기
    const fetchUserLocation = async () => {
      try {
        const response = await defaultAxios.get('/user/location')
        const { latitude, longitude }: addressResponse = response.data.data

        setUserLocation({ latitude, longitude })

        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2Address(
          longitude,
          latitude,
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const roadAddress = result[0].road_address
              const jibunAddress = result[0].address

              if (roadAddress) {
                setAddress(roadAddress.address_name)
                if (
                  !addresses.some(
                    (item) => item.address === roadAddress.address_name
                  )
                ) {
                  addAddress(roadAddress.address_name, true)
                }
              } else if (jibunAddress) {
                setAddress(jibunAddress.address_name)
                if (
                  !addresses.some(
                    (item) => item.address === jibunAddress.address_name
                  )
                ) {
                  addAddress(jibunAddress.address_name, true)
                }
              }
            }
          }
        )
      } catch (error) {
        setErrorMessage('위치 정보를 가져오는 데 실패했습니다.')
      }
    }

    fetchUserLocation()
  }, [addresses, addAddress]) // 주소가 추가될 때마다 다시 호출

  // 현재 위치 가져오기
  const handleSetCurrentLocation = async () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          try {
            const requestData: addressRequest = { latitude, longitude }

            await defaultAxios.patch('/user/location', requestData)

            console.log('현재 위치가 설정되었습니다!')
          } catch (error) {
            setErrorMessage('위치 설정에 실패했습니다.')
          } finally {
            setIsLoading(false)
          }
        },
        (error) => {
          setIsLoading(false)
          setErrorMessage('위치를 가져오는 데 실패했습니다. 권한을 확인하세요.')
        }
      )
    } else {
      setErrorMessage('현재 위치 기능을 지원하지 않는 브라우저입니다.')
    }
  }

  return {
    addresses,
    isLoading,
    errorMessage,
    userLocation,
    handleSetCurrentLocation,
    setAddress,
    address,
  }
}
