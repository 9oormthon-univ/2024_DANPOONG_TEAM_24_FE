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
    const fetchUserLocation = async () => {
      try {
        const response = await defaultAxios.get('/user/location')
        const { latitude, longitude }: addressResponse = response.data.data

        setUserLocation({ latitude, longitude })

        // 좌표 기반으로 중복 체크
        const isDuplicate = addresses.some(
          (item) =>
            item.coordinates?.latitude === latitude &&
            item.coordinates?.longitude === longitude
        )

        if (!isDuplicate) {
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
                  // 좌표 정보와 함께 주소 저장
                  addAddress(roadAddress.address_name, true, {
                    latitude,
                    longitude,
                  })
                } else if (jibunAddress) {
                  setAddress(jibunAddress.address_name)
                  addAddress(jibunAddress.address_name, true, {
                    latitude,
                    longitude,
                  })
                }
              }
            }
          )
        }
      } catch (error) {
        setErrorMessage('위치 정보를 가져오는 데 실패했습니다.')
      }
    }

    fetchUserLocation()
  }, [addresses, addAddress]) // address 의존성 제거

  const handleSetCurrentLocation = async () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            // 좌표 기반으로 중복 체크
            const isDuplicate = addresses.some(
              (item) =>
                item.coordinates?.latitude === latitude &&
                item.coordinates?.longitude === longitude
            )

            if (isDuplicate) {
              alert('현재 위치가 이미 저장되어 있어요!')
              setIsLoading(false)
              return // 중복된 좌표면 여기서 종료
            }

            // 중복이 아닐 경우에만 계속 진행
            const requestData: addressRequest = { latitude, longitude }
            await defaultAxios.patch('/user/location', requestData)

            // 카카오 지도 API로 주소 가져오기
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
                    addAddress(roadAddress.address_name, true, {
                      latitude,
                      longitude,
                    })
                  } else if (jibunAddress) {
                    setAddress(jibunAddress.address_name)
                    addAddress(jibunAddress.address_name, true, {
                      latitude,
                      longitude,
                    })
                  }
                }
                setIsLoading(false)
              }
            )

            console.log('현재 위치가 설정되었습니다!')
          } catch (error) {
            setErrorMessage('위치 설정에 실패했습니다.')
            setIsLoading(false)
          }
        },
        (error) => {
          console.log(error.message)
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
